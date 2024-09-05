import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Text, Alert, Linking, Image } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, Name, ImageCard, ContainerData, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import axios from 'axios';
import { format } from 'date-fns';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { REACT_APP_API_URL } from '@env';

export function Feed({ navigation }: { navigation: any }) {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();

    const [isFollowing, setIsFollowing] = useState(true);
    const [page, setPage] = useState(1); // Add page state

    useEffect(() => {
        checkAuth();
    }, []);

    const BASE_URL = REACT_APP_API_URL;

    useEffect(() => {
        if (isFollowing) {
            fetchFollowedUniversitiesNews();
        } else {
            fetchAllNews();
        }
    }, [isFollowing, page]); // Add page to dependency array

    const fetchFollowedUniversitiesNews = async () => {
        try {
            setLoading(true);

            if (!user) {
                Alert.alert('Erro', 'Você precisa estar logado para ver notícias.');
                return;
            }

            const followedUniversities = await fetchFollowedUniversities();

            if (followedUniversities.length > 0) {
                const newsPromises = followedUniversities.map((university: any) =>
                    fetchNews(university.url, university.image, university.id)
                );
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();

                // Combine with existing news and remove duplicates
                setNews((prevNews) => {
                    const existingUrls = new Set(prevNews.map((item) => item.link));
                    const newNews = allNews.filter((item) => !existingUrls.has(item.link));
                    return [...prevNews, ...newNews];
                });
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllNews = async () => {
        try {
            setLoading(true);
            const universities = await fetchAllUniversities();

            if (universities.length > 0) {
                const newsPromises = universities.map((university: any) =>
                    fetchNews(university.url, university.image, university.id)
                );
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();

                // Combine with existing news and remove duplicates
                setNews((prevNews) => {
                    const existingUrls = new Set(prevNews.map((item) => item.link));
                    const newNews = allNews.filter((item) => !existingUrls.has(item.link));
                    return [...prevNews, ...newNews];
                });
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
        } finally {
            setLoading(false);
        }
    };

    const fetchNews = async (url: string, universityImage: string, universityId: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(url)}`);

            if (response.data && response.data.items) {
                return response.data.items.map((item: any) => {
                    const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
                    return {
                        ...item,
                        image: imageUrl || universityImage,
                        description: cleanedDescription,
                        link: item.link,
                        universityId,
                    };
                });
            } else {
                console.error('Unexpected response structure or null data:', response.data);
                Alert.alert('Erro', 'A resposta do servidor não é a esperada ou está vazia.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
            return [];
        }
    };

    const fetchFollowedUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getuniversityfollowed`, {
                params: { userId: user?.id },
            });

            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string; image: string; id: string }) => university);
            } else {
                Alert.alert('Erro', 'Você não segue nenhuma universidade.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching followed universities:', error);
            Alert.alert('Erro', 'Erro ao buscar universidades seguidas.');
            return [];
        }
    };

    const fetchAllUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getalluniversity`);
            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string; image: string; id: string }) => university);
            } else {
                Alert.alert('Erro', 'Nenhuma universidade encontrada.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching university URLs:', error);
            Alert.alert('Erro', 'Erro ao buscar URLs das universidades.');
            return [];
        }
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };


    const extractImageFromDescription = (description: string) => {
        const match = description.match(/<img[^>]+src="([^">]+)"/);
        
        const cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
      
        return { imageUrl: match ? match[1] : '', cleanedDescription };
      };

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
            <View style={styles.headerTabs}>
                <Pressable
                    style={[styles.tabButton, isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => setIsFollowing(true)}
                >
                    <Text style={isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Seguindo</Text>
                </Pressable>
                <View style={styles.separator} />
                <Pressable
                    style={[styles.tabButton, !isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => setIsFollowing(false)}
                >
                    <Text style={!isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Todas</Text>
                </Pressable>
            </View>
            {loading && <Text>Loading...</Text>}
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    const isNearBottom = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 50;
                    if (isNearBottom && !loading) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}
            >
                <Container style={styles.container}>
                    {news.map((item, index) => (
                        <View key={item.link || index} style={styles.viewCard}>
                            <ContainerData style={styles.card}>
                                {item.image ? (
                                    <ImageCard source={{ uri: item.image }} style={styles.imageCard} />
                                ) : (
                                    <Name>Image not available</Name>
                                )}
                                <Pressable onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}>
                                    <NameBlue style={styles.title}>{item.title}</NameBlue>
                                </Pressable>
                                <View style={styles.data}>
                                    <Name style={styles.text}>{item.description || ''}</Name>
                                    <Pressable onPress={() => Linking.openURL(item.link)}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                            Read More
                                        </Text>
                                    </Pressable>
                                    <Name style={styles.text}>
                                        Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : ''}
                                    </Name>
                                    <Pressable onPress={() => handleSaveNews(item)}>
                                        <Text style={{ color: savedNewsIds.has(item.link) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                                            {savedNewsIds.has(item.link) ? 'Saved' : 'Save News'}
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleRemoveNews(item)}>
                                        <Image
                                            source={{ uri: 'https://img.icons8.com/ios/452/delete-sign.png' }}
                                            style={styles.saveIcon}
                                        />
                                    </Pressable>
                                </View>
                            </ContainerData>
                        </View>
                    ))}
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
}