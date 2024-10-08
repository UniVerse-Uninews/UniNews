import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import { useAuth } from '../context/authContext';

export const useUniversityFollow = (universityId: string | undefined) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const { user } = useAuth();
    const BASE_URL = REACT_APP_API_URL;

    const handleFollowUniversity = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para seguir uma universidade.');
            return;
        }

        try {
            await axios.post(`${BASE_URL}/followuniversity`, {
                userId: user.id,
                universityId
            });
            setIsFollowing(true);
            Alert.alert('Sucesso', 'Você agora está seguindo esta universidade.');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao seguir a universidade.');
            console.error('Erro ao seguir universidade:', error);
        }
    };

    const handleUnfollowUniversity = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para deixar de seguir uma universidade.');
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/unfollowuniversity`, {
                data: {
                    userId: user.id,
                    universityId,
                },
            });
            setIsFollowing(false);
            Alert.alert('Sucesso', 'Você deixou de seguir esta universidade.');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao deixar de seguir a universidade.');
            console.error('Erro ao deixar de seguir universidade:', error);
        }
    };

    const checkIfFollowing = useCallback(async () => {
        if (!user || !universityId) return;
        try {
            const response = await axios.get(`${BASE_URL}/user/${user.id}/university/${universityId}/follow-status`);
            console.log('Resposta ao verificar seguimento:', response.data);
            setIsFollowing(response.data.isFollowing);
        } catch (error: any) {
            console.error('Erro ao verificar seguimento:', error);
            console.log('Erro ao verificar seguimento:', error.response?.data);
        }
    }, [user, universityId]);
    

    useEffect(() => {
        checkIfFollowing();
    }, [checkIfFollowing]);

    return { isFollowing, handleFollowUniversity, handleUnfollowUniversity, checkIfFollowing };
};
