import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';

const http = REACT_APP_API_URL;
const url = 'http://192.168.0.108:8080'; // Global URL variable

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsers = async () => {
  const token = await getToken();
  const getUsersUrl = `${url}/getallusers`;

  console.log('Fetching users from:', getUsersUrl);
  console.log('Using token:', token);

  return axios.get(getUsersUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const token = await getToken();
  const updateUserUrl = `${url}/users/${userId}`;

  console.log('Updating user at:', updateUserUrl);
  console.log('Using token:', token);

  return axios.put(updateUserUrl, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = async (userData: any) => {
  const token = await getToken();
  const addUserUrl = `${url}/users`;

  console.log('Adding user at:', addUserUrl);
  console.log('Using token:', token);

  return axios.post(addUserUrl, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId: string) => {
  const token = await getToken();
  const deleteUserUrl = `${url}/deleteuser/${userId}`;

  console.log('Deleting user at:', deleteUserUrl);
  console.log('Using token:', token);

  return axios.delete(deleteUserUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const loginUrl = `${url}/sessions`;

  console.log('Logging in at:', loginUrl);

  try {
    const response = await axios.post(loginUrl, { email, password }, { timeout: 5000 });

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
  const addUniversityUrl = `${url}/universities`;

  console.log('Adding university at:', addUniversityUrl);
  console.log('Using token:', token);

  return axios.post(addUniversityUrl, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUniversities = async () => {
  const token = await getToken();
  const getUniversitiesUrl = `${url}/getalluniversities`;

  console.log('Fetching universities from:', getUniversitiesUrl);
  console.log('Using token:', token);

  return axios.get(getUniversitiesUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUniversity = async (universityId: string) => {
  const token = await getToken();
  const getUniversityUrl = `${url}/university/${universityId}`;

  console.log('Fetching university from:', getUniversityUrl);
  console.log('Using token:', token);

  return axios.get(getUniversityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUniversity = async (universityId: string, universityData: any) => {
  const token = await getToken();
  const updateUniversityUrl = `${url}/universities/${universityId}`;

  console.log('Updating university at:', updateUniversityUrl);
  console.log('Using token:', token);

  return axios.put(updateUniversityUrl, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUniversity = async (universityId: string) => {
  const token = await getToken();
  const deleteUniversityUrl = `${url}/universities/${universityId}`;

  console.log('Deleting university at:', deleteUniversityUrl);
  console.log('Using token:', token);

  return axios.delete(deleteUniversityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUniversities = async (): Promise<temp_news[]> => {
  const fetchUniversitiesUrl = `${url}/api/universities`;

  console.log('Fetching universities from:', fetchUniversitiesUrl);

  try {
    const response = await axios.get(fetchUniversitiesUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};

export const fetchNewsByUniversity = async (universityName: string): Promise<temp_news[]> => {
  const fetchNewsUrl = `${url}/news/university/${universityName}`;

  console.log('Fetching news for university:', universityName);

  try {
    const response = await axios.get(fetchNewsUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
