// src/screens/perfilUniversidade.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Text, Alert, Linking, ActivityIndicator } from 'react-native';
import { styles } from '@styles/stylePerfilUniversidade';
import { styles as stylefeed } from '@styles/styleFeed';
import { BorderColorContainer, NameBlue,  Container, Card, Name  } from '@theme/style';
import { university as UniversityType } from 'src/@types/university';
import axios from 'axios';
import { format } from 'date-fns';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { RouteProp , ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';
import { RootStackParamList } from '../@types/rootstack'; // Import the correct type

type PerfilUniversidadeRouteProp = RouteProp<RootStackParamList, 'PerfilUniversidade'>;
type PerfilUniversidadeNavigationProp = StackNavigationProp<RootStackParamList, 'PerfilUniversidade'>;

interface PerfilUniversidadeProps {
  route: PerfilUniversidadeRouteProp;
  navigation: PerfilUniversidadeNavigationProp;
}


export function PerfilUniversidade({ route, navigation }: PerfilUniversidadeProps) {
  const { universityId } = route.params;
  const [universityData, setUniversityData] = useState<UniversityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuth();


  const BASE_URL = 'http://192.168.0.108:8080';

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/university/${universityId}`);
        if (response.data && response.data.university) {
          setUniversityData(response.data.university);
        } else {
          Alert.alert('Erro', 'Dados da universidade não encontrados.');
          setUniversityData(null);
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar informações da universidade.');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [universityId]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(universityData?.url || '')}`);
        if (response.data && response.data.items) {
          const newsItems = response.data.items.map((item: any) => {
            const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
            return {
              ...item,
              image: imageUrl || universityData?.image,
              description: cleanedDescription,
              universityId: universityData?.id
            };
          });
          setNews(newsItems);
        } else {
          Alert.alert('Erro', 'Nenhuma notícia encontrada.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar notícias.');
      }
    };

    if (universityData) {
      fetchNews();
    }
  }, [universityData]);

  useEffect(() => {
    console.log('user', user);
    console.log('isAuthenticated', isAuthenticated);
  }, [user, isAuthenticated]);


  const extractImageFromDescription = (description: string) => {
    const match = description.match(/<img[^>]+src="([^">]+)"/);
    const cleanedDescription = match ? description.replace(/<img[^>]+>/g, '') : description;
    return { imageUrl: match ? match[1] : '', cleanedDescription };
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!universityData) {
    return <Text>Erro ao carregar as informações da universidade.</Text>;
  }

  return (
    <>
      <Header />
      <Container style={styles.container1}>
        <ScrollView>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <NameBlue style={styles.name}>{universityData.name}</NameBlue>
              <BorderColorContainer style={styles.description1}>
                <Text>{universityData.description}</Text>
              </BorderColorContainer>
            </View>
            <View style={styles.image}>
              <Image source={{ uri: universityData.image }} style={styles.image1} />
            </View>
          </View>
          {news.length > 0 && (
            <ScrollView>
              {news.map((item, index) => (
                <View key={item.id || index} style={stylefeed.viewCard}>
                  <Card style={stylefeed.card}>
                    {item.image ? (
                      <Image source={{ uri: item.image }} style={stylefeed.imageCard} />
                    ) : (
                      <Name>Image not available</Name>
                    )}
                    <Pressable onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}>
                      <Name style={stylefeed.title}>{item.title}</Name>
                    </Pressable>
                    <View style={stylefeed.data}>
                      <Name style={stylefeed.text}>{item.description || ''}</Name>
                      <Pressable onPress={() => Linking.openURL(item.link)}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                          Read More
                        </Text>
                      </Pressable>
                      <Name style={stylefeed.text}>
                        Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : ''}
                      </Name>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </Container>
      <Footer />
    </>
  );
}
