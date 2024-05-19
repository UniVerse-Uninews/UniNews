// crudHooks.ts - lida com a lógica de estado do CRUD

import { useState } from 'react';
import { getUsers, updateUser, addUser, deleteUser } from '../services/api';

export const useCrud = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    passwordHash: "",
    email: "",
    role: false || true
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

    updateUser(userId, userData)
        .catch((err) => console.log("Erro ao alterar"));
};



  const addUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(user.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }
    if (user.passwordHash.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    addUser({ ...user, role: false })
      .then(() => setUser({id: "",  name: "",  email: "" , passwordHash: "", role: false || true}))
      .catch((err) => console.log("Erro ao adicionar"));
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const deleteUserHandler = (email: string) => {
    deleteUser(email)
      .catch((err) => console.log("Erro ao deletar"));
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
