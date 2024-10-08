import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/styleFeed';
import { useSavedNews } from '../hooks/useSavedNews';
import NewsCardSeach from '../components/addNewsSearch/newsSearch';
import { useAuthCheck } from '../context/authNavigation';
import { Container, NameBlue } from '@theme/style';

export function LerNoticia() {
    const { checkAuth } = useAuthCheck();

    const { savedNews, savedNewsIds, handleSaveNews, handleRemoveNews, fetchSavedNews } = useSavedNews();

    useEffect(() => {
        const init = async () => {
            checkAuth();
        };
        init();
    }, [checkAuth, fetchSavedNews]);



    return (
        <>
            <Header />
            <Container style={styles.container}>
                <NameBlue style={styles.title1}>Notícias Salvas</NameBlue>
                <ScrollView>
                        <NewsCardSeach
                            news={savedNews}
                            savedNewsIds={savedNewsIds}
                            handleSaveNews={handleSaveNews}
                            handleRemoveNews={handleRemoveNews}
                        />
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
