import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable,  Text, Alert, Linking, } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, Card, Name, ImageCard } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import axios from 'axios';
import { format } from 'date-fns';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { REACT_APP_API_URL } from '@env';

export function Feed({ navigation }: { navigation: any }) {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
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

    const fetchNews = async (url: string, universityImage: string, universityId: string) => {
        if (url === '1') {
            console.warn('Invalid URL: Skipping request');
            return [];
        }
    
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
