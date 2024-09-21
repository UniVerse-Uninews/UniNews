import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/styleFeed';
import { useSavedNews } from '../hooks/useSavedNews';
import NewsCard from '../components/addNews/news';
import { useAuthCheck } from '../context/authNavigation';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';
import { Container, NameBlue } from '@theme/style';

export function LerNoticia() {
    const { checkAuth } = useAuthCheck();
    const navigation = useNavigation<NavigationProp>();

    const { savedNews, savedNewsIds, handleSaveNews, handleRemoveNews, fetchSavedNews } = useSavedNews();

    useEffect(() => {
        const init = async () => {
            await checkAuth();
        };
        init();
    }, [checkAuth, fetchSavedNews]);

    if (!savedNews.length) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <NameBlue style={styles.title1}>Notícias Salvas</NameBlue>
                <ScrollView>
                    {savedNews.length > 0 ? (
                        <NewsCard
                            news={savedNews}
                            savedNewsIds={savedNewsIds}
                            handleSaveNews={handleSaveNews}
                            handleRemoveNews={handleRemoveNews}
                        />
                    ) : (
                        <Text>Nenhuma notícia salva</Text>
                    )}
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
