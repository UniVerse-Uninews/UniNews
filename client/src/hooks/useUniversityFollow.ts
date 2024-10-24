import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { REACT_APP_API_URL } from "@env";
import { useAuthApp } from "../context/authContext";

export const useUniversityFollow = () => {
  const [followedUniversities, setFollowedUniversities] = useState<string[]>([]);
  const { user } = useAuthApp();
  const BASE_URL = REACT_APP_API_URL;

  // Função para buscar universidades que o usuário segue
  const fetchFollowedUniversities = async () => {
    if (!user) return;

    try {
      const response = await axios.get(`${BASE_URL}/user/${user.id}/followed-universities`);
      setFollowedUniversities(response.data.map((uni: { id: string }) => uni.id));
    } catch (error) {
      console.error("Erro ao buscar universidades seguidas:", error);
      Alert.alert("Erro", "Não foi possível carregar as universidades seguidas.");
    }
  };

  // Função para seguir uma universidade
  const handleFollowUniversity = async (universityId: string) => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para seguir uma universidade.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/followuniversity`, {
        userId: user.id,
        universityId,
      });
      setFollowedUniversities((prev) => [...prev, universityId]); // Atualiza o estado local
      Alert.alert("Sucesso", "Você agora está seguindo esta universidade.");
    } catch (error) {
      Alert.alert("Erro", "Erro ao seguir a universidade.");
      console.error("Erro ao seguir universidade:", error);
    }
  };

  // Função para deixar de seguir uma universidade
  const handleUnfollowUniversity = async (universityId: string) => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para deixar de seguir uma universidade.");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/unfollowuniversity`, {
        data: {
          userId: user.id,
          universityId,
        },
      });
      setFollowedUniversities((prev) => prev.filter((id) => id !== universityId)); // Atualiza o estado local
      Alert.alert("Sucesso", "Você deixou de seguir esta universidade.");
    } catch (error) {
      Alert.alert("Erro", "Erro ao deixar de seguir a universidade.");
      console.error("Erro ao deixar de seguir universidade:", error);
    }
  };

  // Efeito para buscar universidades seguidas ao montar o hook
  useEffect(() => {
    fetchFollowedUniversities();
  }, [user]);

  return {
    followedUniversities,
    handleFollowUniversity,
    handleUnfollowUniversity,
  };
};
