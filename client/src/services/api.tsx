import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';



const http = REACT_APP_API_URL;
console.log(http);


const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsers = async (userRole: string) => {
  const token = await getToken();
  return axios.get(`${http}/getallusers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const token = await getToken();
  return axios.put(`${http}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = async (userData: any) => {
  const token = await getToken();
  return axios.post(`${http}/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId: string) => {
  const token = await getToken();
  return axios.delete(`${http}/deleteuser/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${http}/sessions`, { email, password });
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  return response;
};

export const addUniversity = async (universityData: any) => {
  const token = await getToken();
  return axios.post(`${http}/university`, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUniversities = async () => {
  const token = await getToken();
  return axios.get(`${http}/getalluniversity`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getUniversity = async (universityId: string) => {
  const token = await getToken();
  return axios.get(`${http}/university/${universityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUniversity = async (universityId: string, universityData: any) => {
  const token = await getToken();
  return axios.put(`${http}/university/${universityId}`, universityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUniversity = async (universityId: string) => {
  const token = await getToken();
  return axios.delete(`${http}/deleteuniversity/${universityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};