import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from '../@types/temp_news';

const http = REACT_APP_API_URL;

// Function to remove HTML tags
const removeHtmlTags = (str: string) => {
  return str.replace(/<[^>]*>?/gm, ''); // Remove all HTML tags
};

// Function to limit the length of a string
const limitString = (str: string, limit: number) => {
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  }
  return str;
};

export const useNews = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to save news
  const saveNews = async (news: any) => {
    try {
      const token = await getToken();
      const temp_n: temp_news[] = [];

      news.items.forEach((n: any) => {
        temp_n.push({
          id: n.id,
          title: n.title,
          description: limitString(removeHtmlTags(n.description), 100),
          image: n.media.thumbnail?.url || '',
          url: n.link,
          category: n.category || '', // Corrected typo
          content: removeHtmlTags(n.content) || '',
          author: n.author,
          createdAt: n.created,
          university: news.link
        });
      });

      await Promise.all(
        temp_n.map(async (n) => {
          await axios.post(`${http}`, n, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
      );

      console.log('Notícias Salvas!');
    } catch (e) {
      console.log('Erro ao salvar!', e);
    }
  };

  // Function to get RSS feed
  const getRss = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      text = encodeURIComponent(text);
      const res = await axios.get(`${http}npm/${text}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      throw new Error('Insira um link válido!');
    } finally {
      setLoading(false);
    }
  };

  // Function to get news
  const getNews = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const encoded = encodeURIComponent(url);
      const res = await axios.get(`${http}${encoded}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (e) {
      throw new Error('Sem dados para esse link!');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveNews,
    getRss,
    getNews,
  };
};

// Additional functions

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
