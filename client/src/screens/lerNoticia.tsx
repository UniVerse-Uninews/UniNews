import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Linking } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/styleFeed';
import { Container, Name, NameBlue, ContainerData, ImageCard } from '@theme/style';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { REACT_APP_API_URL } from '@env';


export function LerNoticia() {
    const BASE_URL = REACT_APP_API_URL;
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();
    
    const [savedNews, setSavedNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

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
                if (Array.isArray(data)) {
                    setSavedNews(data);
                    const ids = new Set(data.map((item: any) => item.id));
                    setSavedNewsIds(ids);
                } else {
                    console.error('Fetched saved news is not an array:', data);
                    setSavedNews([]);
                }
            } catch (error) {
                console.error('Error fetching saved news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedNews();
    }, [user, BASE_URL]);

    const handleSaveNews = async (newsItem: any) => {
        if (savedNewsIds.has(newsItem.id)) {
            setSavedNewsIds((prev) => {
                const updated = new Set(prev);
                updated.delete(newsItem.id);
                return updated;
            });
        } else {
            setSavedNewsIds((prev) => new Set(prev).add(newsItem.id));
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <ScrollView>
                    {savedNews.length > 0 ? (
                        savedNews.map((item: any) => {
                            const noticia = item.news; 

                            return (
                                <View key={item.id} style={styles.viewCard}>
                                    <ContainerData style={styles.card}>
                                        {noticia.image ? (
                                            <ImageCard source={{ uri: noticia.image }} style={styles.imageCard} />
                                        ) : (
                                            <Name>Image not available</Name>
                                        )}
                                        <Pressable onPress={() => {}}>
                                            <NameBlue style={styles.title}>{noticia.title}</NameBlue>
                                        </Pressable>
                                        <View style={styles.data}>
                                            <Name style={styles.text}>{noticia.description || ''}</Name>
                                            <Pressable onPress={() => Linking.openURL(noticia.link)}>
                                                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                                    Read More
                                                </Text>
                                            </Pressable>
                                            <Name style={styles.text}>
                                                Published on: {noticia.published ? format(new Date(noticia.published), 'dd/MM/yyyy HH:mm') : ''}
                                            </Name>
                                            <Pressable onPress={() => handleSaveNews(item)}>
                                                <Text style={{ color: savedNewsIds.has(item.id) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                                                    {savedNewsIds.has(item.id) ? 'Saved' : 'Save News'}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </ContainerData>
                                </View>
                            );
                        })
                    ) : (
                        <Text>No saved news available</Text>
                    )}
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
