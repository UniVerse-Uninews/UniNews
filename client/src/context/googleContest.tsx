import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  user: any | null;
  signOut: () => void;
  loading: boolean;
  handleGoogleLogin: () => Promise<void>;
  loadUser: () => Promise<void>;
  getRefreshToken: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: () => {},
  loading: true,
  handleGoogleLogin: async () => {},
  loadUser: async () => {},
  getRefreshToken: () => {},
});

interface AuthResponse {
  params: {
    code: string;
  };
  type: string;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID || "";
  const REDIRECT_URI = makeRedirectUri();
  const SCOPE = "profile email";
  const RESPONSE_TYPE = "code";

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: [SCOPE],
      responseType: RESPONSE_TYPE,
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    }
  );

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { type, params } = (await promptAsync()) as AuthResponse;

      if (type === "success" && params.code) {
        // Exchange the code for tokens
        const tokenResponse = await exchangeCodeAsync(
          {
            code: params.code,
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            extraParams: {
              code_verifier: request?.codeVerifier || "",
            },
          },
          {
            tokenEndpoint: "https://oauth2.googleapis.com/token",
          }
        );

        if (tokenResponse && tokenResponse.accessToken) {
          const { data } = await axios.get<any>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.accessToken}`
          );

          if (data) {
            const { data: googleData } = await axios.post("/google/session", {
              user_token: tokenResponse.accessToken,
            });

            const parsedData = {
              token: googleData?.token,
              user: googleData?.user,
              refresh_token: googleData?.refresh_token,
            };

            axios.defaults.headers.common.Authorization = `Bearer ${parsedData.token}`;

            await AsyncStorage.setItem(
              "@user",
              JSON.stringify(parsedData.user)
            );
            await AsyncStorage.setItem("@token", parsedData.token);
            await AsyncStorage.setItem(
              "@refresh_token",
              parsedData.refresh_token
            );

            setUser(parsedData);
          }
        }
      }
    } catch (error) {
      console.error("Login Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);

      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@refresh_token");

      axios.defaults.headers.common.Authorization = undefined;
    } catch (error) {
      console.error("Sign Out Error: ", error);
    }
  };

  const loadUser = async () => {
    setLoading(true);
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      const storedToken = await AsyncStorage.getItem("@token");
      const storedRefreshToken = await AsyncStorage.getItem("@refresh_token");

      if (storedUser && storedToken && storedRefreshToken) {
        const parsedUser = {
          user: JSON.parse(storedUser),
          token: storedToken,
          refresh_token: storedRefreshToken,
        };

        axios.defaults.headers.common.Authorization = `Bearer ${parsedUser.token}`;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Load User Error: ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getRefreshToken = async () => {
    try {
      const { data } = await axios.post("/user/session/refresh", {
        refresh_token: user?.refresh_token,
      });

      if (data) {
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

        await AsyncStorage.setItem("@token", data.token);
        setUser(
          (prevState: any) => prevState && { ...prevState, token: data.token }
        );
      }
    } catch (error) {
      console.error("Refresh Token Error: ", error);
      signOut();
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signOut,
        handleGoogleLogin,
        loadUser,
        getRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGoogleAuth must be used within an AuthContextProvider");
  }
  return context;
};
