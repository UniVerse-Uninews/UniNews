import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const BASE_URL = process.env.REACT_APP_API_URL!;

export function useSavedNews() {
    const { user } = useAuth();
    const [savedNews, setSavedNews] = useState<any[]>([]);
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set<string>());

    const fetchSavedNews = useCallback(async () => {
        if (!user) return;

        try {
            const response = await axios.get(`${BASE_URL}/saved-news`, {
                params: { userId: user.id }
            });

            const data = response.data.savedNews || [];
            const ids = new Set<string>(data.map((item: any) => item.news.link));
            setSavedNewsIds(ids);
            setSavedNews(data.map((item: any) => item.news));
        } catch (error) {
            console.error('Error fetching saved news:', error);
        }
    }, [user]);

    useEffect(() => {
        fetchSavedNews();
    }, [fetchSavedNews]);

    const handleSaveNews = useCallback(async (news: any) => {
        if (!user) return;

        try {
            await axios.post(`${BASE_URL}/save-news`, {
                userId: user.id,
                newsUrl: news.link,
            });
            setSavedNewsIds(prevIds => {
                const updatedIds = new Set(prevIds);
                updatedIds.add(news.link);
                return updatedIds;
            });
        } catch (error) {
            console.error('Error saving news:', error);
        }
    }, [user]);

    const handleRemoveNews = useCallback(async (newsUrl: string) => {
        if (!user) return;

        try {
            await axios.delete(`${BASE_URL}/remove-news`, {
                headers: { 'Content-Type': 'application/json' },
                data: { userId: user.id, newsUrl },
            });
            setSavedNewsIds(prevIds => {
                const updatedIds = new Set(prevIds);
                updatedIds.delete(newsUrl);
                return updatedIds;
            });
            await fetchSavedNews();
        } catch (error) {
            console.error('Error removing news:', error);
        }
    }, [user, fetchSavedNews]);

    return { savedNews, savedNewsIds, handleSaveNews, handleRemoveNews, fetchSavedNews };
}
