import { useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { useAuthApp } from '../context/authContext';
import { Alert } from 'react-native';

export const useUniversityProfile = (universityId: string) => {
    const [universityData, setUniversityData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user } = useAuthApp();
    const BASE_URL = REACT_APP_API_URL;

    useEffect(() => {
        const fetchUniversityData = async () => {
            try {
                setLoading(true);

                // Verificar se o universityId é válido
                if (!universityId) {
                    throw new Error('ID da universidade não fornecido.');
                }

                const response = await axios.get(`${BASE_URL}/university/${universityId}`);
                
                if (response.status === 200 && response.data) {
                    setUniversityData(response.data);
                } else {
                    throw new Error('Dados da universidade não encontrados.');
                }

                if (user) {
                    const followResponse = await axios.get(`${BASE_URL}/is-following`, {
                        params: { userId: user.id, universityId }
                    });
                    setIsFollowing(followResponse.data.isFollowing);
                }
            } catch (error: any) {
                console.error('Error fetching university data:', error);
                Alert.alert('Erro', `Erro ao buscar dados da universidade: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversityData();
    }, [universityId, user]);

    const handleFollowUniversity = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para seguir uma universidade.');
            return;
        }

        try {
            await axios.post(`${BASE_URL}/follow-university`, { userId: user.id, universityId });
            setIsFollowing(true);
        } catch (error) {
            console.error('Error following university:', error);
            Alert.alert('Erro', 'Erro ao seguir a universidade.');
        }
    };

    const handleUnfollowUniversity = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para deixar de seguir uma universidade.');
            return;
        }

        try {
            await axios.post(`${BASE_URL}/unfollow-university`, { userId: user.id, universityId });
            setIsFollowing(false);
        } catch (error) {
            console.error('Error unfollowing university:', error);
            Alert.alert('Erro', 'Erro ao deixar de seguir a universidade.');
        }
    };

    return {
        universityData,
        loading,
        isFollowing,
        handleFollowUniversity,
        handleUnfollowUniversity
    };
};
