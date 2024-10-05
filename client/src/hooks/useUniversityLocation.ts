import { useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';


interface university{
    value: string;
    details: any;
    key: string;
    id:string,
    createdAt: Date,
    updatedAt: Date,
    name:string,
    image:string,
    location:string,
    url:string,
    description:string,
    news:temp_news[]  
};
interface Location {
  key: string;
  value: string;
}

export const useLocations = () => {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [universities, setUniversities] = useState<university[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/getalllocations`);
      const locations = response.data.countries.map((country: string, index: number) => ({
        key: index.toString(),
        value: country,
      }));
      setCountries(locations);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar localizações');
      setLoading(false);
    }
  };
  const fetchStates = async (country: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/getstates?country=${country}`);
      const statesData = response.data.states.map((state: string, index: number) => ({
        key: index.toString(),
        value: state,
      }));
      setStates(statesData);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar estados');
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
            details: university
        }));

        console.log('Universidades carregadas:', universitiesData);

        setUniversities(universitiesData);
    } catch (err) {
        setError('Erro ao buscar universidades');
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, states, universities, loading, error, fetchStates, fetchUniversities };
};
