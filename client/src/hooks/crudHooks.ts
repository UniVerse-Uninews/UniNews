import { useState } from 'react';
import {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
  loginUser,
} from '../services/api';
import { User, LoginResponse } from '../@types/interfaces';

export const useCrud = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<LoginResponse | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    passwordHash: '',
    confirmPassword: '',
    role: 'USER',
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Erro ao mostrar', err);
    }
  };

  const updateUserHandler = async (userId: string, userData: User) => {
    try {
      if (!validateEmail(userData.email)) {
        throw new Error('Por favor, insira um endereço de e-mail válido.');
      }
      if (userData.passwordHash.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }
      if (userData.passwordHash !== userData.confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }

      await updateUser(userId, userData);
    } catch (err) {
      console.error('Erro ao alterar: ', err);
    }
  };

  const addUserHandler = async () => {
    try {
      if (!validateEmail(user.email)) {
        throw new Error('Por favor, insira um endereço de e-mail válido.');
      }
      if (user.passwordHash.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }
      if (user.passwordHash !== user.confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }

      await addUser({ ...user, role: 'USER' });
      setUser({
        id: '',
        name: '',
        email: '',
        passwordHash: '',
        confirmPassword: '',
        role: 'USER',
      });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const deleteUserHandler = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error('Erro ao deletar', err);
    }
  };

  const loginHandler = async (email: string, password: string) => {
    try {
      if (!validateEmail(email)) {
        setLoginError('Por favor, insira um endereço de e-mail válido.');
        return;
      }
      if (password.length < 6) {
        setLoginError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
  
      const res = await loginUser(email, password);
  
      const user: User = {
        id: res.id,
        name: '',
        email: '',
        passwordHash: '',
        confirmPassword: '',
        role: res.role,
      };
  
      setLoggedInUser({ ...user, token: '' });
      setLoginError(null);
    } catch (err) {
      setLoginError('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', err);
    }
  };
  
  
  
  

  return {
    users,
    user,
    setUser,
    fetchUsers,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler,
    loginHandler,
    loggedInUser,
    loginError,
  };
};
