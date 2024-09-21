import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import { university as UniversityType } from 'src/@types/university';


export const useUniversityNews = (universityId: string | undefined) => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const BASE_URL = REACT_APP_API_URL;
    const [universityData, setUniversityData] = useState<UniversityType | null>(null);

    useEffect(() => {
        const fetchUniversity = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/university/${universityId}`);
            if (response.data && response.data.university) {
              setUniversityData(response.data.university);
            } else {
              Alert.alert('Erro', 'Dados da universidade não encontrados.');
              setUniversityData(null);
            }
          } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar informações da universidade.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUniversity();
      }, [universityId]);

    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/npm/university/${encodeURIComponent(universityData?.url || '')}`);
            if (response.data && response.data.items) {
              const newsItems = response.data.items.map((item: any) => {
                const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
                return {
                  ...item,
                  image: imageUrl || universityData?.image,
                  description: cleanedDescription,
                  universityId: universityData?.id,
                };
              });
              setNews(newsItems);
            } else {
              Alert.alert('Erro', 'Nenhuma notícia encontrada.');
            }
          } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar notícias.');
          }
        };
    
        if (universityData) {
          fetchNews();
        }
      }, [universityData]);

    const extractImageFromDescription = (description: string) => {
        const match = description.match(/<img[^>]+src="([^">]+)"/);
        const cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
        return { imageUrl: match ? match[1] : '', cleanedDescription };
    };

    return { news, loading };
};
