import axios from 'axios';

const http = "https://tempdeploy.vercel.app";

export const getUsers = () => {
  return axios.get<any[]>(`${http}getallusers`);
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
