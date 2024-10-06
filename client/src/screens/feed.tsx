import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Text, View, Alert } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import NewsCard from '@components/addNews/news';
import { useNews } from '../hooks/saveHooks';

export function Feed({ navigation }: { navigation: any }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const { news, loading, savedNewsIds, handleSaveNews, handleRemoveNews, handleLoadMore, fetchFollowedUniversities } = useNews(isFollowing);

    useEffect(() => {
        const checkFollowedUniversities = async () => {
            const followedUniversities = await fetchFollowedUniversities();
            if (followedUniversities.length === 0 && isFollowing) {
                Alert.alert('Aviso', 'Você não segue nenhuma universidade. Redirecionando para "Todas".');
                setIsFollowing(false); 
            }
        };

        if (isFollowing) {
            checkFollowedUniversities();
        }
    }, [isFollowing]);

    const toggleTab = (following: boolean) => {
        setIsFollowing(following);
    };

    return (
        <>
            <Header />
            <Container style={styles.headerTabs}>
                <Pressable
                    style={[styles.tabButton, isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => toggleTab(true)}
                >
                    <NameBlue style={isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Seguindo</NameBlue>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, !isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => toggleTab(false)}
                >
                    <NameBlue style={!isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Todas</NameBlue>
                </Pressable>
            </Container>
            
            {loading && <Text>Carregando...</Text>}
            <Container style={styles.contLine}>
                <View style={styles.line}/>
            </Container>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    const isNearBottom =
                        nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 50;
                    if (isNearBottom) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}
            >
                {news.length > 0 ? (
                    <NewsCard
                        news={news}
                        savedNewsIds={savedNewsIds}
                        handleSaveNews={handleSaveNews}
                        handleRemoveNews={(link) => handleRemoveNews({ link })}
                    />
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>Nenhuma notícia disponível.</Text>
                    </View>
                )}
            </ScrollView>

            <Footer />
        </>
    );
}
