import React, { useState } from 'react';
import { View, TextInput, ScrollView, Pressable, Image, Text, Alert } from 'react-native';
import { styles } from '@styles/styleFeed';
import { ThemeNews } from '../components/addTheme/theme';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../@types/navigation'; // Importe os tipos de navegação
import { StackNavigationProp } from '@react-navigation/stack';

type FeedNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>;

export function Feed() {
    const [universityName, setUniversityName] = useState('');
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<FeedNavigationProp>(); // Utilize os tipos

    const BASE_URL = 'http://192.168.0.108:8080';

    const fetchNews = async (url: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(url)}`);
            return response.data.items.map((item: any) => ({
                ...item,
                image: extractImageFromDescription(item.description)
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
            return [];
        }
    };

    const extractImageFromDescription = (description: string) => {
        const match = description.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : '';
    };

    const fetchUniversityUrls = async (name: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/university/name/${encodeURIComponent(name)}`);
            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string }) => university.url);
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

    const handleUniversityNameChange = debounce(async (name: string) => {
        try {
            if (!name.trim()) {
                setNews([]);
                return;
            }
            setLoading(true);

            const universityUrls = await fetchUniversityUrls(name);

            if (universityUrls.length > 0) {
                const newsPromises = universityUrls.map((url: string) => fetchNews(url));
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
    }, 500);

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <Container style={styles.view}>
                    <View style={styles.box}>
                        <ThemeNews name="Biológicas" />
                        <ThemeNews name="Exatas" />
                        <ThemeNews name="Humanas" />
                        <ThemeNews name="Linguagens" />
                        <ThemeNews name="Tecnologia" />
                    </View>
                    <TextInput
                        placeholder="Type university name..."
                        value={universityName}
                        onChangeText={(text) => {
                            setUniversityName(text);
                            handleUniversityNameChange(text);
                        }}
                        style={styles.textInput}
                    />
                    {loading && <Text>Loading...</Text>}
                    {news.length > 0 && (
                        <ScrollView>
                            {news.map((item, index) => (
                                <Pressable
                                    key={item.id || index}
                                    onPress={() => {
                                        navigation.navigate('LerNoticia', { noticia: item });
                                    }}
                                >
                                    <View style={styles.viewCard}>
                                        <View style={styles.card}>
                                            {item.image ? (
                                                <Image source={{ uri: item.image }} style={styles.imageCard} />
                                            ) : (
                                                <Text>Image not available</Text>
                                            )}
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View style={styles.data}>
                                                <Text style={styles.text}>{item.description || ''}</Text>
                                                <Text style={styles.text}>Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : ''}</Text>
                                                <Text style={styles.text}>By: {item.author || ''}</Text>
                                                <Text style={styles.text}>Link: {item.link || ''}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>
                    )}
                </Container>
            </Container>
            <Footer />
        </>
    );
}
