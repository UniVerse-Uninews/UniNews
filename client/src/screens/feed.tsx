import React, { useEffect, useState } from 'react';
import { Pressable, View, Alert, ActivityIndicator } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, ScrollContainer, TextBtnFeed } from '@theme/style';
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
                    <TextBtnFeed style={isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Seguindo</TextBtnFeed>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, !isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => toggleTab(false)}
                >
                    <TextBtnFeed style={!isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Todas</TextBtnFeed>
                </Pressable>
            </Container>
            
            
            <Container style={styles.contLine}>
                <View style={styles.line}/>
            </Container>
            <ScrollContainer
            
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
                    <Container style={styles.container}>
                        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                        </Container>    
                        </Container>
                )}
            </ScrollContainer>

            <Footer />
        </>
    );
}
