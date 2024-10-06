import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import { useAuth } from '../context/authContext';

export const useUniversityData = (universityId: string) => {
    const [universityData, setUniversityData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const BASE_URL = REACT_APP_API_URL;

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/university/${universityId}`);
                if (response.data && response.data.university) {
                    setUniversityData(response.data.university);
                    console.log(response.data.university);
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

    return { universityData, loading };
};
