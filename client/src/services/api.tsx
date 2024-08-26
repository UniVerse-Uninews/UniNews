import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { REACT_APP_API_URL } from '@env';
import { temp_news } from 'src/@types/temp_news';
import { university } from 'src/@types/university';

const url = 'http://192.168.0.108:8080'; 
interface LoginResponse{
  token: string;
  role: string;
}

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

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const loginUrl = `${url}/sessions`;

  console.log('Logging in at:', loginUrl);

  try {
    const response = await axios.post(loginUrl, { email, password }, { timeout: 20000 });

    console.log('Response received:', response);

    const { token, role } = response.data;

    if (response.status === 200) {
      if (token) {
        console.log('Received token:', token);
        await AsyncStorage.setItem('token', token);
        console.log('Role:', role);
        return { token, role };
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
  const getUniversitiesUrl = `${url}/getalluniversity`;

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
  const updateUniversityUrl = `${url}/university/${universityId}`;

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
  const deleteUniversityUrl = `${url}/deleteuniversity/${universityId}`;

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

export const getUniversityUrlById = async (universityId: string): Promise<string | null> => {
  try {
    const response = await axios.get(`${url}/university/${universityId}`);
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

    const fetchNewsUrl = `${url}/npm/${encodeURIComponent(universityUrl)}`;
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
  const addUniversityUrl = `${url}/university`;

  console.log('Adding university at:', addUniversityUrl);
  console.log('Using token:', token);

  return axios.post(addUniversityUrl, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
