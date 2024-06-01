import { useState } from 'react';
import {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
  loginUser,
} from '../services/api';

export const useCrud = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState({
    id: '',
    name: '',
    passwordHash: '',
    confirmPassword: '',
    email: '',
    role: 'USER',
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers(user.role);
      setUsers(res.data);
    } catch (err) {
      console.error('Erro ao mostrar', err);
    }

    getUsers(user.role)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Erro ao mostrar', err));
  };

  const updateUserHandler = (userId: string, userData: any) => {
    if (!validateEmail(userData.email)) {
      alert('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    if (userData.passwordHash.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (userData.passwordHash !== userData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    updateUser(userId, userData).catch((err) =>
      console.error('Erro ao alterar: ', err),
    );
  };

  const addUserHandler = async () => {
    console.log('PasswordHash:', user.passwordHash);
    console.log('Email:', user.email);
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

  const deleteUserHandler = (userId: string) => {
    deleteUser(userId).catch((err) => console.error('Erro ao deletar', err));
  };

  const loginHandler = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      setLoginError('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setLoginError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const res = await loginUser(email, password);
      setLoggedInUser(res.data);
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
