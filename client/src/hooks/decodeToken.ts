import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: any) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
