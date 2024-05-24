import { useState } from 'react';
import { getUsers, updateUser, addUser, deleteUser, loginUser } from '../services/api';

export const useCrud = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState({
    id: "",
    name: "",
    passwordHash: "",
    confirmPassword: "",
    email: "",
    role: false
  });

  const fetchUsers = () => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log('Erro ao mostrar'));
  };

  const updateUserHandler = (userId: string, userData: any) => {
    if (!validateEmail(userData.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }
    if (userData.passwordHash.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (userData.passwordHash !== userData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    updateUser(userId, userData)
      .catch((err) => console.log("Erro ao alterar"));
  };

  const addUserHandler = () => {
    if (!validateEmail(user.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }
    if (user.passwordHash.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (user.passwordHash !== user.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    addUser({ ...user, role: false })
      .then(() => setUser({ id: "", name: "", email: "", passwordHash: "", confirmPassword: "", role: false }))
      .catch((err) => console.log("Erro ao adicionar"));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const deleteUserHandler = (userId: string) => {
    deleteUser(userId)
      .catch((err) => console.log("Erro ao deletar"));
  };

  const loginHandler = (email: string, password: string) => {
    if (!validateEmail(email)) {
      setLoginError("Por favor, insira um endereço de e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setLoginError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    loginUser(email, password)
      .then((res: any) => {
        setLoggedInUser(res.data);
        setLoginError(null);
      })
      .catch((err: any) => {
        setLoginError("Erro ao fazer login. Verifique suas credenciais.");
        console.log("Erro ao fazer login:", err);
      });
  };

  return {
    users,
    user,
    setUser,
    fetchUsers,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler,
  };
};
