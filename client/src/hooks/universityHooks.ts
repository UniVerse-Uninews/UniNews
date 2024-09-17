import { useState } from 'react';
import {
  addUniversity,
  getUniversities,
  getUniversity,
  updateUniversity,
  deleteUniversity,
} from '../services/api';
import { university } from '../@types/university';

export const useUniversityCrud = () => {
  const [universities, setUniversities] = useState<university[]>([]);
  const [university, setUniversity] = useState({
    id: '',
    name: '',
    location: '',
    url: '',
    description : '',
    image : ''
  });

  const fetchUniversities = async () => {
    try {
      const res = await getUniversities();
      setUniversities(res.data);
    } catch (err) {
      console.error('Erro ao mostrar universidades', err);
    }
  };

  const fetchUniversity = async (universityId: string) => {
    try {
      const res = await getUniversity(universityId);
      setUniversity(res.data);
    } catch (err) {
      console.error('Erro ao mostrar universidade', err);
    }
  };

  const addUniversityHandler = async () => {
    try {
      await addUniversity({
        ...university,
        createdAt: '',
        updatedAt: '',
        news: []
      });
      setUniversity({
        id: '',
        name: '',
        location: '',
        url: '',
        description : '',
        image : ''
      });
      fetchUniversities();
    } catch (error) {
      console.error('Erro ao adicionar universidade:', error);
    }
  };

  const updateUniversityHandler = async (universityId: string, universityData: any) => {
    try {
      await updateUniversity(universityId, universityData);
      fetchUniversities();
    } catch (err) {
      console.error('Erro ao alterar universidade: ', err);
    }
  };

  const deleteUniversityHandler = async (universityId: string) => {
    try {
      await deleteUniversity(universityId);
      fetchUniversities();
    } catch (err) {
      console.error('Erro ao deletar universidade', err);
    }
  };

  return {
    universities,
    university,
    setUniversity,
    fetchUniversities,
    fetchUniversity,
    addUniversityHandler,
    updateUniversityHandler,
    deleteUniversityHandler,
  };
};
