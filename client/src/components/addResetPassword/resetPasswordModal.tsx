import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Image, Alert } from "react-native";
import { styles as modal } from "../../styles/stylePerfilUser";
import {
  BackgroundInput,
  BackgroundInputText,
  ContainerAlter,
  NameAlter,
} from "@theme/style";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [emailForReset, setEmailForReset] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const http = REACT_APP_API_URL;

  const handleResetPasswordRequest = async () => {
    try {
      await axios.post(`${http}/password-reset/request`, {
        email: emailForReset,
      });
      Alert.alert("Success", "Reset password email sent.");
      setEmailForReset("");
      onClose();
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
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to reset password.");
      console.error("Failed to reset password.", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modal.centeredView}>
        <ContainerAlter style={modal.modalView}>
          <View>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../../assets/imagens/Arrow.png")}
                style={modal.icon1}
              />
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
  );
};
