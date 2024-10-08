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
                
                // Log the entire response data
                console.log('Response data:', response.data);
                
                const university = response.data.university;

                // Check if the 'university' key contains the necessary fields
                if (university) {
                    console.log('University data:', university);
                    console.log('University miniature:', university.miniature); // Logs the miniature URL

                    // Set the university data, including the miniature field
                    setUniversityData(university);
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
