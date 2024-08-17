import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';

const http = REACT_APP_API_URL;

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsers = async () => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/getallusers'; // Use o IP local do seu computador

  console.log('Fetching users from:', url);
  console.log('Using token:', token);

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/users/' + userId; // Use o IP local do seu computador

  console.log('Updating user at:', url);
  console.log('Using token:', token);

  return axios.put(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = async (userData: any) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/users'; // Use o IP local do seu computador

  console.log('Adding user at:', url);
  console.log('Using token:', token);

  return axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId: string) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/deleteuser/' + userId; // Use o IP local do seu computador
  console.log('Deleting user at:', url);
  console.log('Using token:', token);

  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const url = 'http://200.145.153.212:8080/sessions'; // Use o IP local do seu computador

  console.log('Logging in at:', url);

  try {
    const response = await axios.post(url, { email, password }, { timeout: 5000 });

    console.log('Response received:', response);

    if (response.status === 200) {
      const token = response.data.token;
      if (token) {
        console.log('Received token:', token);
        await AsyncStorage.setItem('token', token);
        return response;
      } else {
        console.error('No token received in response');
        throw new Error('No token received');
      }
    } else {
      console.error('Login request failed with status:', response.status);
      throw new Error(`Login failed with status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Error during login request:', error.message || error);
    throw error;
  }
};

export const addUniversity = async (universityData: any) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/universities'; // Use o IP local do seu computador

  console.log('Adding university at:', url);
  console.log('Using token:', token);

  return axios.post(url, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUniversities = async () => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/getalluniversities'; // Use o IP local do seu computador

  console.log('Fetching universities from:', url);
  console.log('Using token:', token);

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUniversity = async (universityId: string) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/university/' + universityId; // Use o IP local do seu computador

  console.log('Fetching university from:', url);
  console.log('Using token:', token);

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUniversity = async (universityId: string, universityData: any) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/universities/' + universityId; // Use o IP local do seu computador

  console.log('Updating university at:', url);
  console.log('Using token:', token);

  return axios.put(url, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUniversity = async (universityId: string) => {
  const token = await getToken();
  const url = 'http://192.168.0.108:8080/universities/' + universityId; // Use o IP local do seu computador

  console.log('Deleting university at:', url);
  console.log('Using token:', token);

  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUniversities = async (): Promise<temp_news[]> => {
  const url = `${http}/api/universities`;

  console.log('Fetching universities from:', url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};

export const fetchNewsByUniversity = async (universityName: string): Promise<temp_news[]> => {
  const url = `${http}/news/university/${universityName}`;

  console.log('Fetching news for university:', universityName);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
