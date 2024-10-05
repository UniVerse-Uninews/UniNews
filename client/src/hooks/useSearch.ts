import { useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

const BASE_URL = REACT_APP_API_URL;


const useNewsSearch = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const inputRef = useRef<TextInput>(null);
    const [universityName, setUniversityName] = useState('');

    const extractImageFromDescription = (description: string) => {
      const match = description.match(/<img[^>]+src="([^">]+)"/);
      const cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
      return { imageUrl: match ? match[1] : '', cleanedDescription };
  };

    const fetchNews = async (url: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(url)}`);
            if (response.data && response.data.items) {
            return response.data.items.map((item: any) => {
              const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
              return {
                ...item,
                image: imageUrl,
                description: cleanedDescription,
                link: item.link,
                // universityId,
              };
            });
          } else {
            console.error('Unexpected response structure or null data:', response.data);
            Alert.alert('Erro', 'A resposta do servidor não é a esperada ou está vazia.');
            return [];
          }
        } catch (error) {
          console.error('Error fetching news:', error);
          Alert.alert('Erro', 'Erro ao buscar notícias.');
          return [];
        }
      };

    const fetchUniversityUrls = async (name: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/university/name/${encodeURIComponent(name)}`);
            console.log('Response:', response.data);
            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string }) => university.url);
            } else {
                Alert.alert('Erro', 'Nenhuma universidade encontrada.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching university URLs:', error);

            Alert.alert('Erro', 'Erro ao buscar URLs das universidades.');
            return [];
        }
    };

    const handleSearchClick = async () => {
        try {
            if (!text.trim()) {
                setNews([]);
                return;
            }
            setLoading(true);

            const universityUrls = await fetchUniversityUrls(text);

            if (universityUrls.length > 0) {
                const newsPromises = universityUrls.map((url: string) => fetchNews(url));
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();
                setNews(allNews);
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeText = (search: string) => {
        setText(search);
    };

    const handlePress = () => {
        if (inputRef.current) {
            inputRef.current.focus(); 
        }
    };

    return {
        news,
        loading,
        text,
        onChangeText,
        handleSearchClick,
        handlePress,
        inputRef,
        fetchNews,
        fetchUniversityUrls,
        setUniversityName,
        universityName,
    };
};

export default useNewsSearch;
