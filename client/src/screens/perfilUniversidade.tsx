import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { styles } from '@styles/stylePerfilUniversidade';
import { Header } from '@components/addHeader/header';
import { BorderColorContainer, Container, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { News } from '@components/addNews/news';
import { university as UniversityType } from 'src/@types/university';
import axios from 'axios';

export function PerfilUniversidade({ route }: { route: { params: { universityId: string } } }) {
  const { universityId } = route.params;
  const [universityData, setUniversityData] = useState<UniversityType | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://192.168.0.108:8080';

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/university/${universityId}`);
        if (response.data && response.data.university) {
          setUniversityData(response.data.university);
        } else {
          console.error('Unexpected response structure or null data:', response.data);
          Alert.alert('Erro', 'Dados da universidade não encontrados.');
          setUniversityData(null);
        }
      } catch (error) {
        console.error('Error fetching university:', error);
        Alert.alert('Erro', 'Erro ao buscar informações da universidade.');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [universityId]);

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
          <View style={styles.container4}>
            <BorderColorContainer style={styles.news}>
              <NameBlue style={styles.name1}>NOTÍCIAS RECENTES</NameBlue>
            </BorderColorContainer>
          </View>
          <News universityId={universityData.id} universityImage={universityData.image} />
        </ScrollView>
      </Container>
      <Footer />
    </>
  );
}
