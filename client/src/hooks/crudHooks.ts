// crudHooks.ts - lida com a lógica de estado do CRUD

import { useState } from 'react';
import { getUsers, updateUser, addUser, deleteUser } from '../services/api';

export const useCrud = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState({
    nome: "",
    senha: "",
    email: "",
    tipo: "adm"
  });

  const fetchUsers = () => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log('Erro ao mostrar'));
  };

  const updateUserHandler = (email: string) => {
    updateUser(email, user)
      .catch((err) => console.log("Erro ao alterar"));
  };

  const addUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(user)
      .then(() => setUser({ nome: "", senha: "", email: "", tipo: "" }))
      .catch((err) => console.log("Erro ao adicionar"));
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
    deleteUserHandler
  };
};
