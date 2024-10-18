import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  login: (userData: { token: string; role: string; id: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkStoredToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData"); // Armazena as informações do usuário

      if (token && userData) {
        setUser(JSON.parse(userData)); // Recupera as informações do usuário
        setIsAuthenticated(true);
      }
    };

    checkStoredToken();
  }, []);

  const login = (userData: { token: string; role: string; id: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    AsyncStorage.setItem("token", userData.token); // Armazena o token
    AsyncStorage.setItem("userData", JSON.stringify(userData)); // Armazena as informações do usuário
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token"); // Remove o token ao fazer logout
    await AsyncStorage.removeItem("userData"); // Remove as informações do usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthApp() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
