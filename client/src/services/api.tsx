import axios from 'axios';

const http = "http://localhost:8080/";

export const getUsers = () => {
  return axios.get<any[]>(`${http}users`);
};

export const updateUser = (userId: string, userData: any) => {
  return axios.put(`${http}users/${userId}`, userData);
};

export const addUser = (userData: any) => {
  console.log(userData);
  return axios.post(`${http}users`, userData);
};

export const deleteUser = (userId: string) => {
  return axios.delete(`${http}users/${userId}`);
};
