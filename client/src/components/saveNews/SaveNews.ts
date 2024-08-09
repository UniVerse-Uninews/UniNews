import axios from 'axios';


export const saveNews = async (data: any) => {
  const response = await axios.post('http://192.168.0.107/news', data);
  return response.data;
};