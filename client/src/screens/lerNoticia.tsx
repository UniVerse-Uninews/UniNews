import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Header } from "@components/addHeader/header";
import { Footer } from "../components/addFooter/footer";
import { styles } from "../styles/styleFeed";
import { useSavedNews } from "../hooks/useSavedNews";
import NewsCardSeach from "../components/addNewsSearch/newsSearch";
import { useAuthCheck } from "../context/authNavigation";
import { Container, NameBlue } from "@theme/style";

export function LerNoticia() {
  const { checkAuth } = useAuthCheck();

  const {
    savedNews,
    savedNewsIds,
    handleSaveNews,
    handleRemoveNews,
    fetchSavedNews,
  } = useSavedNews();

  useEffect(() => {
    checkAuth(); // Verifica a autenticação do usuário
  }, [checkAuth]);

  useEffect(() => {
    const init = async () => {
      await fetchSavedNews(); // Chama a função para buscar as notícias salvas
    };
    init();
  }, [fetchSavedNews]); // Remove 'checkAuth' do array de dependências

  return (
    <>
      <Header />
      <Container style={styles.container}>
        <NameBlue style={styles.title1}>Notícias Salvas</NameBlue>
        <ScrollView>
          <NewsCardSeach
            news={savedNews} // Usa savedNews do hook
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
