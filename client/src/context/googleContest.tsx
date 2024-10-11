import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  user: any | null;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any | null>;
  signOut: () => void;
  loading: boolean;
  handleGoogleLogin: () => Promise<any | null>;
  loadUser: () => Promise<void>;
  getRefreshToken: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async ({ email, password }) => {
    return null;
  },
  signOut: () => {},
  user: null,
  loading: true,
  handleGoogleLogin: async () => {
    return null;
  },
  loadUser: async () => {},
  getRefreshToken: () => {},
});

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const SCOPE = encodeURI(process.env.EXPO_PUBLIC_SCOPE ?? "profile email");
  const RESPONSE_TYPE = process.env.EXPO_PUBLIC_RESPONSE_TYPE;

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const redirectUri = makeRedirectUri();
      const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: CLIENT_ID || "",
          redirectUri,
          scopes: ["profile", "email"],
        },
        {
          authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
        }
      );

      const { type, params } = (await promptAsync()) as AuthResponse;

      if (type === "success") {
        const { data } = await axios.get<any>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        if (data) {
          const { data: googleData } = await axios.post("/google/session", {
            user_token: params.access_token,
          });

          const parsedData: any = {
            token: googleData?.data?.token,
            user: googleData?.data?.user,
            refresh_token: googleData?.data?.refresh_token,
          };

          axios.defaults.headers.common.Authorization = `Bearer ${parsedData?.token}`;

          axios.interceptors.response.use(
            (response) => {
              return response;
            },
            async (error) => {
              if (error.response.status === 401) {
                await signOut();
              }
              return Promise.reject(error);
            }
          );

          await AsyncStorage.setItem("@user", JSON.stringify(parsedData?.user));
          await AsyncStorage.setItem(
            "@token",
            JSON.stringify(parsedData.token)
          );
          await AsyncStorage.setItem(
            "@refresh_token",
            JSON.stringify(parsedData.refresh_token)
          );

          setUser(parsedData);

          return parsedData;
        }
      }
      return null;
    } catch (error) {
      console.error(error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/user/session", {
        email,
        password,
      });

      const parsedData: any = {
        token: data?.data?.token,
        user: data?.data?.user,
        refresh_token: data?.data?.refresh_token,
      };

      axios.defaults.headers.common.Authorization = `Bearer ${parsedData?.token}`;

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData?.user));
      await AsyncStorage.setItem("@token", JSON.stringify(parsedData.token));
      await AsyncStorage.setItem(
        "@refresh_token",
        JSON.stringify(parsedData.refresh_token)
      );

      setUser(parsedData);

      return data;
    } catch (error) {
      setUser(null);

      console.error(error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);

      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@refresh_Token");

      axios.interceptors.request.clear();
      axios.defaults.headers.common.Authorization = undefined;
    } catch (error) {
      setUser(null);

      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@refresh_Token");

      console.error(error);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const getUser = await AsyncStorage.getItem("@user");
      const getToken = await AsyncStorage.getItem("@token");
      const getRefreshToken = await AsyncStorage.getItem("@refresh_token");

      if (getUser && getToken && getRefreshToken) {
        const parsedUser = {
          user: JSON.parse(getUser),
          token: JSON.parse(getToken),
          refresh_token: JSON.parse(getRefreshToken),
        };

        axios.defaults.headers.common.Authorization = `Bearer ${parsedUser?.token}`;

        setUser(parsedUser);
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser: any) => {
    try {
      setLoading(true);

      const parsedData: any = {
        token: user?.token ?? "",
        user: {
          ...user?.user,
          ...updatedUser?.data,
        },
        refresh_token: user?.refresh_token ?? "",
      };

      axios.defaults.headers.common.Authorization = `Bearer ${parsedData?.token}`;

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData));

      setUser(parsedData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getRefreshToken = async () => {
    try {
      const { data } = await axios.post("user/session/refresh", {
        refresh_token: user?.refresh_token,
      });

      if (data) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data?.token}`;

        await AsyncStorage.setItem("@token", JSON.stringify(data.token));
        setUser((state: any) => state && { ...state, token: data?.token });
      }
    } catch (error) {
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
        signIn,
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
    throw new Error("useAuth must be used within a AuthContext");
  }

  return context;
};
