import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Text, Alert, Linking } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, Card, Name, ImageCard } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import axios, { AxiosError } from 'axios';
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

    useEffect(() => {
        checkAuth();
    }, []);

    const BASE_URL = REACT_APP_API_URL;

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                setLoading(true);
                const universities = await fetchAllUniversities();

                if (universities.length > 0) {
                    const newsPromises = universities.map((university: any) => fetchNews(university.url, university.image, university.id));
                    const newsResults = await Promise.all(newsPromises);
                    const allNews = newsResults.flat();
                    setNews(allNews);
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

        fetchAllNews();
    }, []);

    useEffect(() => {
        const fetchSavedNews = async () => {
            if (!user) return;
            console.log('userId:', user.id);
            try {
                const response = await axios.get<{ savedNews: string[] }>(`${BASE_URL}/saved-news/${user.id}`);
                console.log('response:', response.data);
                
                if (response.data && response.data.savedNews) {
                    setSavedNewsIds(new Set(response.data.savedNews));
                } else {
                    console.error('Unexpected response structure:', response.data);
                    Alert.alert('Erro', 'A resposta do servidor não é a esperada.');
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.error('Endpoint not found:', error);
                        Alert.alert('Erro', 'Endpoint não encontrado. Verifique a URL.');
                    } else if (error.response.status === 500) {
                        console.error('Server error:', error);
                        Alert.alert('Erro', 'Erro interno do servidor. Tente novamente mais tarde.');
                    } else {
                        console.error('Error fetching saved news:', error);
                        Alert.alert('Erro', 'Erro ao carregar notícias salvas.');
                    }
                } else {
                    console.error('Error fetching saved news:', error);
                    Alert.alert('Erro', 'Erro ao carregar notícias salvas.');
                }
            }
        };
        
        fetchSavedNews();
    }, [user]);

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
                        universityId
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

    const extractImageFromDescription = (description: string) => {
        const match = description.match(/<img[^>]+src="([^">]+)"/);
        
        if (match) {
            const cleanedDescription = description.replace(/<img[^>]+>/g, '');
            return { imageUrl: match[1], cleanedDescription };
        } else {
            return { imageUrl: '', cleanedDescription: description };
        }
    };

    const fetchAllUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getalluniversity`);
            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string, image: string, id: string }) => university);
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

    const handleSaveNews = async (newsId: string) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para salvar uma notícia.');
            return;
        }
    
        try {
            const response = await axios.post(`${BASE_URL}/save-news`, {
                userId: user.id,
                newsId
            });
    
            if (response.status === 200) {
                setSavedNewsIds(prevIds => new Set(prevIds).add(newsId));
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
    
    

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <Container style={styles.view}>
                    {loading && <Text>Loading...</Text>}
                    {news.length > 0 && (
                        <ScrollView>
                            {news.map((item, index) => (
                                <View key={item.id || index} style={styles.viewCard}>
                                    <Card style={styles.card}>
                                        {item.image ? (
                                            <ImageCard source={{ uri: item.image }} style={styles.imageCard} />
                                        ) : (
                                            <Name>Image not available</Name>
                                        )}
                                        <Pressable onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}>
                                            <Name style={styles.title}>{item.title}</Name>
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
                                            <Pressable onPress={() => handleSaveNews(item.id)}>
                                                <Text style={{ color: savedNewsIds.has(item.id) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                                                    {savedNewsIds.has(item.id) ? 'Saved' : 'Save News'}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </Card>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </Container>
            </Container>
            <Footer />
        </>
    );
}
