import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
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
            try {
                const response = await axios.get(`${BASE_URL}/saved-news`, {
                    params: { userId: user.id }
                });

                const data = response.data.savedNews;
                // Verifique se `data` é um array
                if (Array.isArray(data)) {
                    setSavedNews(data);
                } else {
                    console.error('Fetched saved news is not an array:', data);
                    setSavedNews([]);
                }
            } catch (error) {
                console.error('Error fetching saved news:', error);
            } finally {
                setLoading(false); // Mova isso para garantir que o loading seja removido após a tentativa de fetch
            }
        };

        fetchSavedNews();
    }, [user, BASE_URL]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <ScrollView>
                    {savedNews.length === 0 ? (
                        <Text>No saved news available</Text>
                    ) : (
                        savedNews.map((item: any) => {
                            const noticia = item.news; // Acessa a notícia dentro de `savedNews`

                            return (
                                <View key={item.id} style={styles.card}>
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
                            );
                        })
                    )}
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
