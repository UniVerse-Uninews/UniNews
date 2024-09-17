import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';
import { university } from 'src/@types/university';
import { LoginResponse } from 'src/@types/interfaces';

const http = REACT_APP_API_URL;
console.log('API URL:', http);


const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsers = async () => {
  const token = await getToken();
  const getUsersUrl = `${http}/getallusers`;

  console.log('Fetching users from:', getUsersUrl);
  console.log('Using token:', token);

  return axios.get(getUsersUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUser = async (userId: string) => {
  const token = await getToken();
  const getUserUrl = `${http}/users/${userId}`;

  console.log('Fetching user from:', getUserUrl);
  console.log('Using token:', token);

  return axios.get(getUserUrl);
};

export const updateUser = async (userId: string, userData: any) => {
  const token = await getToken();
  const updateUserUrl = `${http}/users/${userId}`;

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
  const addUserUrl = `${http}/users`;

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
  const deleteUserUrl = `${http}/deleteuser/${userId}`;

  console.log('Deleting user at:', deleteUserUrl);
  console.log('Using token:', token);

  return axios.delete(deleteUserUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const loginUrl = `${http}/sessions`;

  console.log('Logging in at:', loginUrl);

  try {
    const response = await axios.post(loginUrl, { email, password }, { timeout: 20000 });

    console.log('Response received:', response);

    const { token, role } = response.data;

    if (response.status === 200) {
      if (token) {
        console.log('Received token:', token);
        await AsyncStorage.setItem('token', token);
        const id = response.data.id;
        console.log('Id:', id);
        console.log('Role:', role);
        return { token, role, id };
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

export const getUniversities = async () => {
  const token = await getToken();
  const getUniversitiesUrl = `${http}/getalluniversity`;

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
  const getUniversityUrl = `${http}/university/${universityId}`;

  console.log('Fetching university from:', getUniversityUrl);
  console.log('Using token:', token);

  return axios.get(getUniversityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUniversity = async (universityId: string, universityData: university) => {
  const token = await getToken();
  const updateUniversityUrl = `${http}/university/${universityId}`;

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
  const deleteUniversityUrl = `${http}/deleteuniversity/${universityId}`;

  console.log('Deleting university at:', deleteUniversityUrl);
  console.log('Using token:', token);

  return axios.delete(deleteUniversityUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUniversities = async (): Promise<temp_news[]> => {
  const fetchUniversitiesUrl = `${http}/api/universities`;

  console.log('Fetching universities from:', fetchUniversitiesUrl);

  try {
    const response = await axios.get(fetchUniversitiesUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};

export const getUniversityUrlById = async (universityId: string): Promise<string | null> => {
  try {
    const response = await axios.get(`${http}/university/${universityId}`);
    if (response.data && response.data.university && response.data.university.url) {
      return response.data.university.url;
    } else {
      console.error('University URL is missing');
      return null;
    }
  } catch (error) {
    console.error('Error fetching university URL:', error);
    throw error;
  }
};

export const fetchNewsByUniversity = async (universityId: string): Promise<temp_news[]> => {
  try {
    const universityUrl = await getUniversityUrlById(universityId);
    
    if (!universityUrl) {
      throw new Error('University URL is invalid');
    }

    const fetchNewsUrl = `${http}/npm/${encodeURIComponent(universityUrl)}`;
    console.log('Fetching news for university URL:', fetchNewsUrl);

    const response = await axios.get<{ items: temp_news[] }>(fetchNewsUrl);
    console.log('API Response:', response.data);

    if (response.data && response.data.items) {
      console.log('News items:', response.data.items);
      return response.data.items;
    } else {
      console.error('Unexpected response structure:', response.data);
      return []; 
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; 
  }
};

export const addUniversity = async (universityData: university) => {
  const token = await getToken();
  const addUniversityUrl = `${http}/university`;

  console.log('Adding university at:', addUniversityUrl);
  console.log('Using token:', token);

  return axios.post(addUniversityUrl, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useUniversityActions = () => {
  const followUniversity = async (userId: string, universityId: string) => {
    try {
      await axios.post(`${http}/followuniversity`, { userId, universityId });
    } catch (err) {
      console.error('Error following university:', err);
    }
  };

  const saveNewsArticle = async (userId: string, newsId: string) => {
    try {
      await axios.post(`${http}/save-news`, { userId, newsId });
    } catch (err) {
      console.error('Error saving news article:', err);
    }
  };

  return { followUniversity, saveNewsArticle };
};

