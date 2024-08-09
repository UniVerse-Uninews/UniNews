// components/getNews/GetNews.ts
import axios from 'axios';

export const getNews = async (text: string) => {
  try {
    const response = await axios.get(`http://192.168.0.107/news/${encodeURIComponent(text)}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error;
  }
};
