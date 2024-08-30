import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/lerNoticiaStyle';
import { Container, Name, NameBlue } from '@theme/style';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { REACT_APP_API_URL } from '@env';

export function LerNoticia() {
    const BASE_URL = REACT_APP_API_URL;
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const [savedNews, setSavedNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            console.error('User ID is not available');
            setLoading(false);
            return;
        }

        const fetchSavedNews = async () => {
            if (!user) return;
    
            try {
                const response = await axios.get(`${BASE_URL}/saved-news/${user.id}`);
                console.log('Response Data:', response.data); // Log para depuração
    
                if (response.data && response.data.savedNews && Array.isArray(response.data.savedNews)) {
                    const newsRequests = response.data.savedNews.map(async (saved: any) => {
                        try {
                            const url = encodeURIComponent(saved.newsId);
                            console.log('Fetching news with encoded URL:', url); // Log para depuração
                            const newsResponse = await axios.get(`${BASE_URL}/news-by-url/${url}`);
                            console.log('News Response:', newsResponse.data); // Log para depuração
                            return newsResponse.data;
                        } catch (error: any) {
                            console.error('Error fetching news:', error);
                            return null;
                        }
                    });
    
                    const news = await Promise.all(newsRequests);
                    setSavedNews(news.filter((item) => item !== null));
                } else {
                    console.error('Unexpected response structure:', response.data);
                    Alert.alert('Erro', 'A resposta do servidor não é a esperada.');
                }
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching saved news:', error);
                Alert.alert('Erro', 'Erro ao carregar notícias salvas.');
                setLoading(false);
            }
        };
        
        

        fetchSavedNews();
    }, [user, BASE_URL,]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <ScrollView>
                    {savedNews.length === 0 ? (
                        <Text>No saved news available</Text>
                    ) : (
                        savedNews.map((noticia: any) => (
                            <View key={noticia.id} style={styles.card}>
                                {noticia.image ? (
                                    <Image source={{ uri: noticia.image }} style={styles.imageCard} />
                                ) : (
                                    <Text>Image not available</Text>
                                )}
                                <NameBlue style={styles.title}>{noticia.title}</NameBlue>
                                <View style={styles.infos}>
                                    <NameBlue style={styles.text}>Por: {noticia.author || ''}</NameBlue>
                                    <NameBlue style={styles.text}>Publicado em: {noticia.published ? format(new Date(noticia.published), 'dd/MM/yyyy HH:mm') : ''}</NameBlue>
                                </View>
                                <View style={styles.data}>
                                    <Name style={styles.text}>{noticia.description || ''}</Name>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
