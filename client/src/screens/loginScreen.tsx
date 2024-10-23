// src/screens/Login.tsx
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/styleLogin";
import {
  BackgroundContainerInput,
  BackgroundInput,
  Container,
  Name,
} from "@theme/style";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { ResetPasswordModal } from "../components/addResetPassword/resetPasswordModal";
import { SocialButton } from "@components/socialButton/socialButton";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { loginUser } from "@services/api";
import { useAuthApp } from "src/context/authContext";

WebBrowser.maybeCompleteAuthSession();

export const Login = ({ navigation }: any) => {
  const eye = require("../../assets/imagens/eye.png");
  const eyeOff = require("../../assets/imagens/eyeOff.png");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { signOut } = useAuth(); // Use signOut se necessário
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const [showResetModal, setShowResetModal] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const { login } = useAuthApp();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        navigation.navigate("Feed");
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const { token, role, id } = await loginUser(username, password);
      console.log("Login successful:", { token, role, id });

      const userInfo = { token, role, id };

      login(userInfo);

      navigation.navigate("Feed");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Erro de autenticação",
        "Erro ao fazer login. Verifique suas credenciais.",
        [{ text: "OK" }]
      );
      setLoginError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleSocialLogin = async () => {
    setIsLoadingGoogle(true); // Inicie o carregamento
    try {
      const oAuthFlow = await googleOAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
          navigation.navigate("Feed");
        }
      } else {
        console.log("Login com Google falhou", oAuthFlow);
        Alert.alert("Erro", "Falha ao fazer login com o Google.");
      }
    } catch (error) {
      console.error("Erro no login social:", error);
      Alert.alert("Erro", "Erro ao fazer login com o Google.");
    } finally {
      setIsLoadingGoogle(false); // Finalize o carregamento
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.logo}>
        <Name style={styles.Uni}>UNI</Name>
        <Name style={styles.News}>NEWS</Name>
      </View>
      <View style={styles.subtitle}>
        <Name style={styles.subtitletext}>
          SUA JANELA PARA O MUNDO ACADÊMICO
        </Name>
      </View>

      <BackgroundContainerInput style={styles.box}>
        <View style={styles.campo}>
          <Name style={styles.campotext}>Usuário</Name>
          <BackgroundInput style={styles.input}>
            <TextInput
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={"#8F8F8F"}
              autoCapitalize="none"
              style={styles.inputUsuario}
            />
          </BackgroundInput>
        </View>
        <BackgroundContainerInput style={styles.campo}>
          <Name style={styles.campotext}>Senha</Name>
          <BackgroundInput style={styles.input}>
            <TextInput
              placeholder="Senha"
              value={password}
              secureTextEntry={passHide}
              onChangeText={setPassword}
              placeholderTextColor={"#8F8F8F"}
              style={styles.inputSenha}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setPassHide(!passHide)}
            >
              {passHide ? (
                <Image source={eye} style={styles.icon} />
              ) : (
                <Image source={eyeOff} style={styles.icon} />
              )}
            </TouchableOpacity>
          </BackgroundInput>
        </BackgroundContainerInput>
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

        <TouchableOpacity onPress={() => setShowResetModal(true)}>
          <Text style={styles.senha}>Esqueci a senha</Text>
        </TouchableOpacity>

        <View style={styles.boxbutton}>
          <View style={styles.contText}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.textbutton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.textbutton}>Criar conta</Text>
          </TouchableOpacity>
          </View>
         
           <SocialButton
            onPress={handleSocialLogin}
            title={"  Login"}
            icon="logo-google"
            isLoading={isLoadingGoogle}
            style={styles.socialButton  }
            
          />
        </View>
        
      </BackgroundContainerInput>

      <ResetPasswordModal
        visible={showResetModal}
        onClose={() => setShowResetModal(false)}
      />

      

      <StatusBar style="auto" />
    </Container>
  );
};
