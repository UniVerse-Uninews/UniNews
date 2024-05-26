import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = "http://192.168.0.115:8080/";

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsers = async (userRole: string) => {
  const token = await getToken();
  return axios.get(`${http}getallusers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId: string, userData: any) => {
  const token = await getToken();
  return axios.put(`${http}users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = async (userData: any) => {
  const token = await getToken();
  return axios.post(`${http}users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId: string) => {
  const token = await getToken();
  return axios.delete(`${http}deleteuser/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${http}sessions`, { email, password });
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  return response;
};
