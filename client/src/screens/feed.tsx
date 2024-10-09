import React, { useEffect, useState, useCallback } from "react";
import { Pressable, View, ActivityIndicator } from "react-native";
import { styles } from "@styles/styleFeed";
import { Header } from "@components/addHeader/header";
import { Container, ScrollContainer, TextBtnFeed } from "@theme/style";
import { Footer } from "@components/addFooter/footer";
import NewsCard from "@components/addNews/news";
import { useNews } from "@hooks/saveHooks";
import { useSavedNews } from "@hooks/useSavedNews";

export function Feed({ navigation }: { navigation: any }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { news, handleLoadMore } = useNews(isFollowing);
  const { fetchSavedNews, savedNewsIds, handleSaveNews, handleRemoveNews } =
    useSavedNews();

  // Use useCallback to memoize fetchSavedNews
  const memoizedFetchSavedNews = useCallback(() => {
    fetchSavedNews();
  }, [fetchSavedNews]);

  useEffect(() => {
    memoizedFetchSavedNews();
  }, [memoizedFetchSavedNews]);

  const toggleTab = (following: boolean) => {
    setIsFollowing(following);
  };

  return (
    <>
      <Header />
      <Container style={styles.headerTabs}>
        <Pressable
          style={[
            styles.tabButton,
            isFollowing ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => toggleTab(true)}
        >
          <TextBtnFeed
            style={isFollowing ? styles.tabTextActive : styles.tabTextInactive}
          >
            Seguindo
          </TextBtnFeed>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            !isFollowing ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => toggleTab(false)}
        >
          <TextBtnFeed
            style={!isFollowing ? styles.tabTextActive : styles.tabTextInactive}
          >
            Todas
          </TextBtnFeed>
        </Pressable>
      </Container>

      <Container style={styles.contLine}>
        <View style={styles.line} />
      </Container>

      <ScrollContainer
        onScroll={({ nativeEvent }) => {
          const isNearBottom =
            nativeEvent.contentOffset.y +
              nativeEvent.layoutMeasurement.height >=
            nativeEvent.contentSize.height - 50;
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
            handleRemoveNews={handleRemoveNews}
          />
        ) : (
          <Container style={styles.container}>
            <Container
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </Container>
          </Container>
        )}
      </ScrollContainer>

      <Footer />
    </>
  );
}
