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
export function LerNoticia({ route }: any) {
    const BASE_URL = REACT_APP_API_URL;
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, []);
    console.log('userId:', user.id); // Add logging for debugging
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
              if (response.data) {
                setSavedNews(response.data);
              } else {
                console.error('Unexpected response structure:', response.data);
                Alert.alert('Erro', 'A resposta do servidor não é a esperada.');
              }
            } catch (error: any) {
              if (error.response && error.response.status === 404) {
                console.error('Endpoint not found:', error);
                Alert.alert('Erro', 'Endpoint não encontrado. Verifique a URL.');
              } else {
                console.error('Error fetching saved news:', error);
                Alert.alert('Erro', 'Erro ao carregar notícias salvas.');
              }
            }
          };
          

        fetchSavedNews();
    }, [user]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <ScrollView>
                    {savedNews.length === 0 ? (
                        <Text>No saved news available</Text>
                    ) : (
                        savedNews.map((noticia) => (
                            <View key={noticia.news.id} style={styles.card}>
                                {noticia.news.image ? (
                                    <Image source={{ uri: noticia.news.image }} style={styles.imageCard} />
                                ) : (
                                    <Text>Image not available</Text>
                                )}
                                <NameBlue style={styles.title}>{noticia.news.title}</NameBlue>
                                <View style={styles.infos}>
                                    <NameBlue style={styles.text}>Por: {noticia.news.author || ''}</NameBlue>
                                    <NameBlue style={styles.text}>Publicado em: {noticia.news.published ? format(new Date(noticia.news.published), 'dd/MM/yyyy HH:mm') : ''}</NameBlue>
                                </View>
                                <View style={styles.data}>
                                    <Name style={styles.text}>{noticia.news.description || ''}</Name>
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
