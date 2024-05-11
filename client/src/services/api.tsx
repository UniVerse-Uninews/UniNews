import axios from 'axios';

const http = "http://localhost:8080/api";

export const getUsers = () => {
  return axios.get<any[]>(`${http}/get`);
};

export const updateUser = (email: string, userData: any) => {
  return axios.put(`${http}/update/${email}`, userData);
};

export const addUser = (userData: any) => {
  return axios.post(`${http}/save`, userData);
};

export const deleteUser = (email: string) => {
  return axios.delete(`${http}/delete/${email}`);
};