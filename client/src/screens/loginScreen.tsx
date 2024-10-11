import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api";
import { styles } from "../styles/styleLogin";
import {
  BackgroundContainerInput,
  BackgroundInput,
  BorderColorButton,
  Container,
  Name,
  BackgroundInputText,
  ContainerAlter,
  NameAlter,
} from "@theme/style";
import { useAuth } from "../context/authContext";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import { styles as modal } from "../styles/stylePerfilUser";

import { decodeToken } from "@hooks/decodeToken";
import { GoogleButton } from "@components/googleButton/googleButton";
import { useGoogleAuth } from "src/context/googleContest";

export const Login = ({ navigation }: any) =>  {
  const dirSetaVoltar = require("../../assets/imagens/Arrow.png");

  const eye = require("../../assets/imagens/eye.png");
  const eyeOff = require("../../assets/imagens/eyeOff.png");

  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const http = REACT_APP_API_URL;

  const { handleGoogleLogin } = useGoogleAuth();
  const handleSocialLogin = async () => {
    await handleGoogleLogin();
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decodedToken = decodeToken(token);

        if (decodedToken && "role" in decodedToken && "id" in decodedToken) {
          login({
            token,
            role: (decodedToken as any).role,
            id: (decodedToken as any).id,
          });
        }
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

  const handleResetPasswordRequest = async () => {
    try {
      await axios.post(`${http}/password-reset/request`, {
        email: emailForReset,
      });
      console.log("Reset password email sent.", emailForReset);
      Alert.alert("Success", "Reset password email sent.");
      setEmailForReset("");
      setShowResetModal(false);
    } catch (error) {
      Alert.alert("Error", "Failed to send reset password email.");
      console.error("Failed to send reset password email.", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      await axios.post(`${http}/password-reset/reset`, { token, newPassword });
      Alert.alert("Success", "Password reset successful.");
      setShowResetModal(false);
    } catch (error) {
      Alert.alert("Error", "Failed to reset password.");
      console.error("Failed to reset password.", error);
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
              onChangeText={(texto) => setPassword(texto)}
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
      </BackgroundContainerInput>

      {/* Reset Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResetModal}
        onRequestClose={() => {
          setShowResetModal(false);
        }}
      >
        <View style={modal.centeredView}>
          <ContainerAlter style={modal.modalView}>
            <View style={styles.container1}>
              <TouchableOpacity
                onPress={() => {
                  setShowResetModal(false);
                  setModalVisible(true);
                }}
              >
                <Image source={dirSetaVoltar} style={styles.icon1} />
              </TouchableOpacity>
            </View>
            <NameAlter style={modal.modalText}>
              Email para redefinir senha:
            </NameAlter>
            <View style={modal.containerInput}>
              <BackgroundInput style={modal.inputArea}>
                <BackgroundInputText
                  style={modal.input}
                  placeholder="E-mail"
                  placeholderTextColor={"#8F8F8F"}
                  value={emailForReset}
                  onChangeText={setEmailForReset}
                />
              </BackgroundInput>
            </View>
            <TouchableOpacity
              style={[modal.button, modal.buttonClose]}
              onPress={handleResetPasswordRequest}
            >
              <NameAlter style={modal.textStyle}>
                Enviar E-mail de Redefinição
              </NameAlter>
            </TouchableOpacity>
            <NameAlter style={modal.modalText}>Token:</NameAlter>
            <View style={modal.containerInput}>
              <BackgroundInput style={modal.inputArea}>
                <BackgroundInputText
                  style={modal.input}
                  placeholder="Token"
                  placeholderTextColor={"#8F8F8F"}
                  value={token}
                  onChangeText={setToken}
                />
              </BackgroundInput>
            </View>
            <NameAlter style={modal.modalText}>Nova Senha:</NameAlter>
            <View style={modal.containerInput}>
              <BackgroundInput style={modal.inputArea}>
                <BackgroundInputText
                  style={modal.input}
                  placeholder="Nova Senha"
                  placeholderTextColor={"#8F8F8F"}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </BackgroundInput>
            </View>
            <NameAlter style={modal.modalText}>Confirmar Nova Senha:</NameAlter>
            <View style={modal.containerInput}>
              <BackgroundInput style={modal.inputArea}>
                <BackgroundInputText
                  style={modal.input}
                  placeholder="Confirmar Nova Senha"
                  placeholderTextColor={"#8F8F8F"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </BackgroundInput>
            </View>
            <TouchableOpacity
              style={[modal.button, modal.buttonClose]}
              onPress={handleResetPassword}
            >
              <NameAlter style={modal.textStyle}>Redefinir Senha</NameAlter>
            </TouchableOpacity>
          </ContainerAlter>
        </View>
      </Modal>
      <GoogleButton onPress={handleSocialLogin} title="Google" />

      <StatusBar style="auto" />
    </Container>
  );
}