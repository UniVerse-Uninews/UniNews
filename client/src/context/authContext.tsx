import React, { createContext, useContext, useState, useEffect } from "react";
import { tokenCache } from "../storage/tokenCache";
import { useOAuth, useAuth, useUser } from "@clerk/clerk-expo";
import axios from "axios";

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  login: (userData: { token: string; role: string; id: string }) => void;
  googleLogin: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const { getToken } = useAuth(); // Hook para pegar o token
  const { user: clerkUser } = useUser(); // Hook para pegar o usuário logado do Clerk

  useEffect(() => {
    const checkStoredToken = async () => {
      const token = await tokenCache.getToken("token"); // Usando tokenCache
      const userData = await tokenCache.getToken("userData"); // Armazena as informações do usuário

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`; // Define o token globalmente
      }
    };

    checkStoredToken();
  }, []);

  const login = (userData: { token: string; role: string; id: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    tokenCache.saveToken("token", userData.token); // Usando tokenCache para salvar
    tokenCache.saveToken("userData", JSON.stringify(userData)); // Armazena as informações do usuário
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
  };

  const googleLogin = async () => {
    try {
      const oAuthFlow = await googleOAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === "success") {
        const token = await getToken(); // Pega o token de autenticação do Clerk

        const googleUserData = {
          token: token || "", // Acessa o token diretamente
          user: clerkUser, // Pega os dados do usuário do Clerk
        };

        // Armazene os dados de autenticação do Google
        setUser(googleUserData);
        setIsAuthenticated(true);
        await tokenCache.saveToken("token", googleUserData.token); // Usando tokenCache para salvar o token
        await tokenCache.saveToken("userData", JSON.stringify(googleUserData)); // Salvando dados do usuário no tokenCache
        axios.defaults.headers.common.Authorization = `Bearer ${googleUserData.token}`;
      }
    } catch (error) {
      console.error("Erro no login via Google:", error);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await tokenCache.saveToken("token", ""); // Removendo token
    await tokenCache.saveToken("userData", ""); // Removendo dados do usuário
    axios.defaults.headers.common.Authorization = undefined;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthApp() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthApp must be used within an AuthProvider");
  }
  return context;
}
