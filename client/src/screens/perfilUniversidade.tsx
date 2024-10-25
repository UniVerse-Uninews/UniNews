import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { styles } from "@styles/stylePerfilUniversidade";
import { styles as stylefeed } from "@styles/styleFeed";
import {
  BorderColorContainer,
  BorderTitle,
  BtnSeguir,
  Container,
  Name,
  TextBtnFeed,
  TitlePesq,
} from "@theme/style";
import { useUniversityData } from "../hooks/useUniversityData";
import { useUniversityNews } from "../hooks/useUniversityNews";
import { useUniversityFollow } from "../hooks/useUniversityFollow";
import { Header } from "@components/addHeader/header";
import { Footer } from "../components/addFooter/footer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/rootstack";
import { useAuthCheck } from "src/context/authNavigation";
import { useNews } from "@hooks/saveHooks";
import NewsCardSearch from "../components/addNewsSearch/newsSearch";

type PerfilUniversidadeRouteProp = RouteProp<
  RootStackParamList,
  "PerfilUniversidade"
>;
type PerfilUniversidadeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PerfilUniversidade"
>;

interface PerfilUniversidadeProps {
  route: PerfilUniversidadeRouteProp;
  navigation: PerfilUniversidadeNavigationProp;
}

export function PerfilUniversidade({
  route,
  navigation,
}: PerfilUniversidadeProps) {
  const { universityId } = route.params;
  const { universityData, loading: universityLoading } =
    useUniversityData(universityId);
  const { news, loading: newsLoading } = useUniversityNews(universityId);
  const {
    followedUniversities,
    handleFollowUniversity,
    handleUnfollowUniversity,
  } = useUniversityFollow();
  const { savedNewsIds, handleSaveNews, handleRemoveNews } = useNews(
    followedUniversities.includes(universityId)
  );
  const { checkAuth } = useAuthCheck();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isFollowing = followedUniversities.includes(universityId);

  const handleButtonPress = async () => {
    try {
      if (isFollowing) {
        await handleUnfollowUniversity(universityId);
      } else {
        await handleFollowUniversity(universityId);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o estado de seguimento.");
    }
  };

  if (universityLoading || newsLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!universityData) {
    return <Text>Erro ao carregar as informações da universidade.</Text>;
  }

  return (
    <>
      <Header />
      <Container style={styles.container1}>
        <ScrollView>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <TitlePesq style={styles.name}>{universityData.name}</TitlePesq>
              <BorderColorContainer style={styles.description1}>
                <Name>{universityData.description}</Name>
              </BorderColorContainer>
              <BtnSeguir
                onPress={handleButtonPress}
                style={[
                  styles.followButton,
                  isFollowing ? styles.unfollowButton : styles.followButton,
                ]}
              >
                <Name style={styles.followButtonText}>
                  {isFollowing ? "Deixar de seguir" : "Seguir Universidade"}
                </Name>
              </BtnSeguir>
            </View>
            <View style={styles.image}>
              <Image
                source={{ uri: universityData.miniature }}
                style={styles.image1}
              />
            </View>
          </View>
          <View style={stylefeed.container}>
            <BorderTitle style={styles.contTitle}>
              <TextBtnFeed style={styles.title}>Notícias Recentes</TextBtnFeed>
            </BorderTitle>
            <NewsCardSearch
              news={news}
              savedNewsIds={savedNewsIds}
              handleSaveNews={handleSaveNews}
              handleRemoveNews={handleRemoveNews}
            />
          </View>
        </ScrollView>
      </Container>
      <Footer />
    </>
  );
}
