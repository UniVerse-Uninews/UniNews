import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Text, Alert, Linking, ActivityIndicator } from 'react-native';
import { styles } from '@styles/stylePerfilUniversidade';
import { styles as stylefeed } from '@styles/styleFeed';
import { BorderColorContainer,  Container, Name, ImageCard, ContainerData, NameBlue  } from '@theme/style';
import { university as UniversityType } from 'src/@types/university';
import axios from 'axios';
import { format } from 'date-fns';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';
import { RootStackParamList } from '../@types/rootstack';
import { useAuthCheck } from 'src/context/authNavigation'; 
import { REACT_APP_API_URL } from '@env';

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
  const [isFollowing, setIsFollowing] = useState(false); // New state to track if following
  const { user } = useAuth();
  const { checkAuth } = useAuthCheck();
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkAuth();
  }, []);

  const BASE_URL = REACT_APP_API_URL;

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
        const response = await axios.get(`${BASE_URL}/npm/university/${encodeURIComponent(universityData?.url || '')}`);
        if (response.data && response.data.items) {
          const newsItems = response.data.items.map((item: any) => {
            const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
            return {
              ...item,
              image: imageUrl || universityData?.image,
              description: cleanedDescription,
              universityId: universityData?.id,
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

  const extractImageFromDescription = (description: string) => {
    const match = description.match(/<img[^>]+src="([^">]+)"/);
    
    const cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
  
    return { imageUrl: match ? match[1] : '', cleanedDescription };
  };

  const handleFollowUniversity = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para seguir uma universidade.');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/followuniversity`, {
        userId: user.id,
        universityId: universityData?.id
      });
      setIsFollowing(true);
      Alert.alert('Sucesso', 'Você agora está seguindo esta universidade.');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao seguir a universidade.');
      console.error('Erro ao seguir universidade:', error);
    }
  };

  const handleUnfollowUniversity = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para deixar de seguir uma universidade.');
      return;
    }
  
    try {
      await axios.delete(`${BASE_URL}/unfollowuniversity`, {
        data: {
          userId: user.id,
          universityId: universityData?.id,
        },
      });
      setIsFollowing(false);
      Alert.alert('Sucesso', 'Você deixou de seguir esta universidade.');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deixar de seguir a universidade.');
      console.error('Erro ao deixar de seguir universidade:', error);
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!universityData) {
    return <Text>Erro ao carregar as informações da universidade.</Text>;
  }

  const handleSaveNews = async (news: any) => {
    if (!user) {
        Alert.alert('Erro', 'Você precisa estar logado para salvar uma notícia.');
        return;
    }

    if (!news.link) {
        console.error('News link is missing');
        Alert.alert('Erro', 'Link da notícia está ausente.');
        return;
    }

    const newsData = {
        link: news.link, 
        title: news.title || '',
        description: news.description || '',
        image: news.image || '',
        author: news.author || '',
        published: news.published || new Date(),
        created: news.created || new Date(),
        category: news.category || [],
        enclosures: news.enclosures || [],
        media: news.media || {}
    };

    try {
        console.log('Sending data:', {
            userId: user.id,
            news: newsData
        });

        const response = await axios.post(`${BASE_URL}/save-news`, {
            userId: user.id,
            news: newsData
        });

        if (response.status === 200) {
            Alert.alert('Sucesso', 'Notícia salva com sucesso.');
        } else {
            console.error('Error saving news:', response.data);
            Alert.alert('Erro', 'Erro ao salvar notícia.');
        }
    } catch (error) {
        console.error('Error saving news:', error);
        Alert.alert('Erro', 'Erro ao salvar notícia.');
    }
};

const handleRemoveNews = async (newsUrl: string) => {
  if (!user) {
    Alert.alert('Erro', 'Você precisa estar logado para remover uma notícia.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/remove-news`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        newsUrl: newsUrl.link,
      }),
      
    });
    console.log('response:', newsUrl);

    if (response.ok) {
      Alert.alert('Sucesso', 'Notícia removida com sucesso.');
    } else {
      const errorData = await response.json();
      Alert.alert('Erro', errorData.error || 'Erro ao remover notícia.');
    }
  } catch (error) {
    console.error('Error removing news:', error);
    Alert.alert('Erro', 'Erro ao remover notícia.');
  }
};


  return (
    <>
      <Header />
      <Container style={styles.container1}>
        <ScrollView>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <NameBlue style={styles.name}>{universityData.name}</NameBlue>
              <BorderColorContainer style={styles.description1}>
                <Name>{universityData.description}</Name>
              </BorderColorContainer>
              <Pressable onPress={handleFollowUniversity} style={styles.followButton}>
                <Text style={styles.followButtonText}>{isFollowing ? 'Seguindo' : 'Seguir Universidade'}</Text>
              </Pressable>
              <Pressable onPress={handleUnfollowUniversity} style={styles.followButton}>
                <Text style={styles.followButtonText}>Deixar de seguir</Text>
              </Pressable>
            </View>
            <View style={styles.image}>
              <Image source={{ uri: universityData.image }} style={styles.image1} />
            </View>
          </View>
          {news.length > 0 && (
                        <ScrollView>
                            <Container style={stylefeed.container}>
                            {news.map((item, index) => (
                                <View key={item.id || index} style={stylefeed.viewCard}>
                                    <ContainerData style={stylefeed.card}>
                                        {item.image ? (
                                            <ImageCard source={{ uri: item.image }} style={stylefeed.imageCard} />
                                        ) : (
                                            <Name>Image not available</Name>
                                        )}
                                        <Pressable onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}>
                                            <NameBlue style={stylefeed.title}>{item.title}</NameBlue>
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
                                            <Pressable onPress={() => handleSaveNews(item)}>
                                                <Text style={{ color: savedNewsIds.has(item.id) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                                                    {savedNewsIds.has(item.id) ? 'Saved' : 'Save News'}
                                                </Text>
                                            </Pressable>
                                            <Pressable onPress={() => handleRemoveNews(item)}>
                                            <Image
                                              source={{ uri: 'https://img.icons8.com/ios/452/delete-sign.png' }}
                                                style={stylefeed.saveIcon}
                                            />
                                            </Pressable>
                                        </View>
                                    </ContainerData>
                                </View>
                            ))}
                            </Container>
                        </ScrollView>
                    )}
        </ScrollView>
      </Container>
      <Footer />
    </>
  );
}
