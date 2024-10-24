import { useState, useCallback } from "react";
import axios from "axios";
import { useAuthApp } from "../context/authContext";

const BASE_URL = process.env.REACT_APP_API_URL!;

export function useSavedNews() {
  const { user } = useAuthApp();
  const [savedNews, setSavedNews] = useState<any[]>([]);
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(
    new Set<string>()
  );

  const fetchSavedNews = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axios.get(`${BASE_URL}/saved-news`, {
        params: { userId: user.id },
      });

      const data = response.data.savedNews || [];
      const ids = new Set<string>(data.map((item: any) => item.news.link));
      setSavedNewsIds(ids);
      setSavedNews(data.map((item: any) => item.news));
    } catch (error) {
      console.error("Error fetching saved news:", error);
    }
  }, [user]);

  const handleSaveNews = useCallback(
    async (news: any) => {
      if (!user) return;

      try {
        const response = await axios.post(`${BASE_URL}/save-news`, {
          userId: user.id,
          news: {
            link: news.link,
            title: news.title,
            description: news.description,
            image: news.image,
            author: news.author,
            published: news.published,
            created: news.created,
            category: news.category,
            enclosures: news.enclosures,
            media: news.media,
          },
        });

        if (response.status === 200) {
          setSavedNewsIds((prevIds) => new Set(prevIds).add(news.link));
          setSavedNews((prevNews) => [...prevNews, news]);
        } else {
          console.error("Falha ao salvar a notícia");
        }
      } catch (error) {
        console.error("Erro ao salvar notícia:", error);
      }
    },
    [user]
  );

  const handleRemoveNews = useCallback(
    async (news: any) => {
      if (!user) return;

      try {
        const response = await axios.delete(`${BASE_URL}/remove-news`, {
          data: {
            userId: user.id,
            newsUrl: encodeURIComponent(news.link),
          },
        });
        console.log("RESPONSE", response);

        if (response.status === 200) {
          setSavedNewsIds((prevIds) => {
            const updatedIds = new Set(prevIds);
            updatedIds.delete(news.link);
            return updatedIds;
          });
          setSavedNews((prevNews) =>
            prevNews.filter((item) => item.link !== news.link)
          );
          console.log("Notícia removida com sucesso");
        } else {
          console.error("Falha ao remover a notícia");
        }
      } catch (error: any) {
        console.error("Erro ao remover notícia: teste", error);
        if (error.response && error.response.status === 404) {
          console.warn("Notícia já removida ou não encontrada:", news.link);
          setSavedNewsIds((prevIds) => {
            const updatedIds = new Set(prevIds);
            updatedIds.delete(news.link);
            return updatedIds;
          });
          setSavedNews((prevNews) =>
            prevNews.filter((item) => item.link !== news.link)
          );
        } else {
          console.error("Erro inesperado ao remover notícia:", error);
        }
      }
    },
    [user]
  );

  return {
    savedNews,
    savedNewsIds,
    handleSaveNews,
    handleRemoveNews,
    fetchSavedNews,
  };
}
