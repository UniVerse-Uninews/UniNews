import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Linking, Image, Alert } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/styleFeed';
import { Container, Name, NameBlue, ContainerData, ImageCard } from '@theme/style';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { REACT_APP_API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';


export function LerNoticia() {
    const BASE_URL = REACT_APP_API_URL;
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();

    const navigation = useNavigation<NavigationProp>();
    
    const [savedNews, setSavedNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());

    const dir_save = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_vazio.png';
    const dir_unsave = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_cheio.png';

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const fetchSavedNews = async () => {
        if (!user) {
            console.error('User ID is not available');
            setLoading(false);
            return;
        }

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

    useEffect(() => {
        fetchSavedNews();
    }, [user, BASE_URL]);

    const handleRemoveNews = async (newsUrl: string) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para remover uma notícia.');
            return;
        }
        console.log('newsUrl:', newsUrl);

        try {
            const response = await fetch(`${BASE_URL}/remove-news`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    newsUrl,
                }),
            });

            const responseBody = await response.text();

            if (response.ok) {
                Alert.alert('Sucesso', 'Notícia removida com sucesso.');
                setSavedNewsIds((prevIds) => {
                    const updatedIds = new Set(prevIds);
                    updatedIds.delete(newsUrl);

                    return updatedIds;
                });
                fetchSavedNews();
            } else {
                try {
                    const errorData = JSON.parse(responseBody);
                    Alert.alert('Erro', errorData.error || 'Erro ao remover notícia.');
                } catch (parseError) {
                    Alert.alert('Erro', 'Erro ao remover notícia. Resposta da API não é JSON.');
                }
            }
        } catch (error) {
            console.error('Error removing news:', error);
            Alert.alert('Erro', 'Erro ao remover notícia.');
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <NameBlue style={styles.title1}>Notícias Salvas</NameBlue>
                <ScrollView>
                    {savedNews.length > 0 ? (
                        savedNews.map((item: any) => {
                            const noticia = item.news; 

                            return (
                                
                                <Pressable onPress={() => Linking.openURL(noticia.link)}>
                                <View key={item.id} style={styles.viewCard}>
                                    <ContainerData style={styles.card}>
                                        {noticia.image ? (
                                            <ImageCard source={{ uri: noticia.image }} style={styles.imageCard} />
                                        ) : (
                                            <Name>Image not available</Name>
                                        )}
                                            <NameBlue style={styles.title}>{noticia.title}</NameBlue>
                                        <View style={styles.data}>
                                            <Name style={styles.text}>{noticia.description || ''}</Name>
                                            
                                            <Name style={styles.text}>
                                                Published on: {noticia.published ? format(new Date(noticia.published), 'dd/MM/yyyy HH:mm') : ''}
                                            </Name>
                                            <View style={styles.iconContainer}>

                                            <Pressable
                                                onPress={() => handleRemoveNews(noticia.link)}
                                            >
                                                <Image
                                                source={{ uri: dir_unsave }}
                                                style={styles.saveIcon}
                                                />
                                            </Pressable>

                                            <Pressable
                                            style={styles.profileImageContainer}
                                            onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}
                                            >
                                            <Image
                                                source={{ uri: 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_logout.png' }} 
                                                style={styles.profileImage}
                                            />
                                            </Pressable>
                                            </View>
                                        </View>
                                    </ContainerData>
                                </View>
                                </Pressable>
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
