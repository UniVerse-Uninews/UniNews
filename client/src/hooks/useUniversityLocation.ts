import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';

interface university {
    value: string,
    details: any,
    key: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    image: string,
    location: string,
    url: string,
    description: string,
    news: temp_news[];
};

interface Location {
  key: string,
  value: string;
}

export const useLocations = () => {
  const [states, setStates] = useState<Location[]>([]);
  const [universities, setUniversities] = useState<university[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/getalllocations`);
  
      if (response.data && Array.isArray(response.data.countries)) {
        const statesData = response.data.countries.map((state: string, index: number) => ({
          key: index.toString(),
          value: state,
        }));
        setStates(statesData);
        console.log('Estados obtidos:', statesData);
      } else {
        console.error('A resposta não contém o campo "countries" ou não é um array.');
        setError('Erro ao buscar estados');
      }
    } catch (err) {
      setError('Erro ao buscar estados');
      console.error('Erro ao buscar estados:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchUniversities = async (state: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/getuniversities?state=${state}`);
      const universitiesData = response.data.universities.map((university: any) => ({
        key: university.name,
        value: university.name,
        details: university,
      }));
      setUniversities(universitiesData);
    } catch (err: AxiosError | any) {
      console.error('Erro ao buscar universidades:', err);
      setError('Erro ao buscar universidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates(); 
  }, []);

  return { states, universities, loading, error, fetchStates, fetchUniversities };
};
