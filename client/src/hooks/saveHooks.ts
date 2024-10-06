import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import { useAuth } from '../context/authContext';
import he from 'he';

export const useNews = (isFollowing: boolean) => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [isEndReached, setIsEndReached] = useState(false);
    const limit = 6;

    const BASE_URL = REACT_APP_API_URL;

    useEffect(() => {
        setPage(1);
        setNews([]);
        setIsEndReached(false);
        fetchNews();
    }, [isFollowing]);

    useEffect(() => {
        if (page > 1) {
            fetchNews();
        }
    }, [page]);

    const fetchNews = async () => {
        if (isFollowing) {
            await fetchFollowedUniversitiesNews();
        } else {
            await fetchAllNews();
        }
    };

    const fetchFollowedUniversitiesNews = async () => {
        try {
            setLoading(true);
            if (!user) {
                Alert.alert('Erro', 'Você precisa estar logado para ver notícias.');
                return;
            }

            const followedUniversities = await fetchFollowedUniversities();

            if (followedUniversities.length > 0) {
                const newsPromises = followedUniversities.map((university: any) =>
                    fetchNewsFromUniversity(university.url, university.image, university.id)
                );
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();

                setNews((prevNews) => {
                    const existingUrls = new Set(prevNews.map((item) => item.link));
                    const newNews = allNews.filter((item) => !existingUrls.has(item.link));
                    return page === 1 ? newNews : [...prevNews, ...newNews];
                });

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

    const fetchAllNews = async () => {
        if (loading || isEndReached) return;

        try {
            setLoading(true);

            const universities = await fetchAllUniversities(page, limit);

            if (universities.length > 0) {
                const newsPromises = universities.map((university: any) =>
                    fetchNewsFromUniversity(university.url, university.image, university.id)
                );
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();

                setNews((prevNews) => {
                    const existingUrls = new Set(prevNews.map((item) => item.link));
                    const newNews = allNews.filter((item) => !existingUrls.has(item.link));
                    return page === 1 ? newNews : [...prevNews, ...newNews];
                });

                if (allNews.length < limit) {
                    setIsEndReached(true);
                }
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

    const fetchNewsFromUniversity = async (url: string, universityImage: string, universityId: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(url)}`, {
                params: { page, limit },
            });

            if (response.data && response.data.items) {
                return response.data.items.map((item: any) => {
                    const { imageUrl, cleanedDescription } = extractImageFromDescription(item.description);
                    return {
                        ...item,
                        image: imageUrl || universityImage,
                        description: he.decode(cleanedDescription),
                        title: he.decode(item.title || ''), 
                        link: item.link,
                        universityId,
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

    const fetchFollowedUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getuniversityfollowed`, {
                params: { userId: user?.id },
            });

            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string; image: string; id: string }) => university);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching followed universities:', error);
            return [];
        }
    };

    const fetchAllUniversities = async (page: number, limit: number = 6) => {
        try {
            const response = await axios.get(`${BASE_URL}/univesitypagination`, {
                params: { page, limit },
            });

            const universities = response.data.universities;

            if (universities && universities.length > 0) {
                return universities.map((university: { url: string; image: string; id: string }) => university);
            } else {
                if (page === 1) {
                    Alert.alert('Erro', 'Nenhuma universidade encontrada.');
                }
                return [];
            }
        } catch (error) {
            console.error('Error fetching university URLs:', error);
            Alert.alert('Erro', 'Erro ao buscar URLs das universidades.');
            return [];
        }
    };

    const extractImageFromDescription = (description: string) => {
        const match = description.match(/<img[^>]+src="([^">]+)"/);
        const cleanedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
        return { imageUrl: match ? match[1] : '', cleanedDescription };
    };

    const handleSaveNews = async (news: any) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para salvar uma notícia.');
            return;
        }

        if (savedNewsIds.has(news.link)) {
            Alert.alert('Erro', 'Esta notícia já foi salva.');
            return;
        }

        try {
            const newsData = { link: news.link, title: news.title || '', description: news.description || '', image: news.image || '', author: news.author || '', published: news.published || new Date(), created: news.created || new Date(), category: news.category || [], enclosures: news.enclosures || [], media: news.media || {} };

            const response = await axios.post(`${BASE_URL}/save-news`, { userId: user.id, news: newsData });

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Notícia salva com sucesso.');
                setSavedNewsIds((prevIds) => new Set([...prevIds, news.link]));
            } else {
                Alert.alert('Erro', 'Erro ao salvar notícia.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar notícia.');
        }
    };

    const handleRemoveNews = async (news: any) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para remover uma notícia.');
            return;
        }

        try {
            const response = await axios.delete(`${BASE_URL}/remove-news`, { data: { userId: user.id, newsUrl: news.link } });

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Notícia removida com sucesso.');
                setSavedNewsIds((prevIds) => {
                    const updatedIds = new Set(prevIds);
                    updatedIds.delete(news.link);
                    return updatedIds;
                });
            } else {
                Alert.alert('Erro', 'Erro ao remover notícia.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao remover notícia.');
        }
    };

    return { 
        news, 
        loading, 
        savedNewsIds, 
        handleSaveNews, 
        handleRemoveNews, 
        handleLoadMore: () => !isEndReached && !loading && !isFollowing && setPage((prev) => prev + 1),
        fetchFollowedUniversities 
    };
};
