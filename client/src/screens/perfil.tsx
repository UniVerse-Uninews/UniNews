import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { Header } from '../components/addHeader/header';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { styles } from '../styles/stylePerfilUser';
import { ContainerAlter, BorderColorBlue, Container, ContainerData, Name, NameBlue, NameAlter, BackgroundInput, BackgroundInputText } from '@theme/style';
import { getUser } from '@services/api';
import { User } from 'src/@types/interfaces';
import { useCrud } from '../hooks/crudHooks';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { InputAlteraSenha, InputConfirmAlteraSenha } from '@components/addInput/Input';

export function Perfil ()  {
  const [modalVisible, setModalVisible] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [emailForReset, setEmailForReset] = useState('');
  
  const {
    setUser,
    updateUserHandler,
    userFields
  } = useCrud();
  const { user } = useAuth();
  const { checkAuth, handleLogout, } = useAuthCheck();

  const http = REACT_APP_API_URL;

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...userFields, [field]: value });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      getUser(user.id)
        .then((response) => {
          setUserData(response.data.user); 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleResetPasswordRequest = async () => {
    try {
      await axios.post(`${http}/password-reset/request`, { email: emailForReset });
      console.log('Reset password email sent.', emailForReset);
      Alert.alert('Success', 'Reset password email sent.');
      setEmailForReset('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset password email.');
      console.error('Failed to send reset password email.', error);
    }
  };
  
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await axios.post(`${http}/password-reset/reset`, { token, newPassword });
      Alert.alert('Success', 'Password reset successful.');
      setShowResetModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password.');
      console.error('Failed to reset password.', error);
    }
  };

  
  return (
    <>
      <Header />
      <Container style={styles.container}>
        <BorderColorBlue style={styles.perfil}></BorderColorBlue>
        <ContainerData style={styles.containerNick}>
          <Name style={styles.nick}>{userData?.name}</Name>
        </ContainerData>
        <View style={styles.box}>
          <View style={styles.seg}>
            <Name>Seguidores</Name>
          </View>
          <View style={styles.seg}>
            <Name>Publicações</Name>
          </View>
        </View>
        <View style={styles.viewTitle}>
          <NameBlue style={styles.title}>DADOS PESSOAIS</NameBlue>
        </View>
        <ContainerData style={styles.containerData}>
          <View style={styles.box}>
            <Name style={styles.campotext}>Username: {userData ? userData.name : 'N/A'}</Name>
          </View>
          <View style={styles.box}>
            <Name style={styles.campotext}>Email: {userData ? userData.email : 'N/A'}</Name>
          </View>
          <View style={styles.box1}>
              <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <ContainerAlter style={styles.modalView}>
              <NameAlter style={styles.modalText}>Nome: </NameAlter>
              <View style={styles.containerInput}>
                <BackgroundInput style={styles.inputArea}>
                  <BackgroundInputText
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor={'#8F8F8F'}
                    value={userFields.name}  
                    onChangeText={(text) => handleInputChange('name', text)}
                  />
                </BackgroundInput>
              </View>

              <NameAlter style={styles.modalText}>Email: </NameAlter>
              <View style={styles.containerInput}>
                <BackgroundInput style={styles.inputArea}>
                  <BackgroundInputText
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor={'#8F8F8F'}
                    value={userFields.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                  />
                </BackgroundInput>
              </View>

              <NameAlter style={styles.modalText}>Senha: </NameAlter>
              <InputAlteraSenha
                user={userFields}
                setUser={setUser}
                placeholder="Insira sua nova senha"
              />

              <NameAlter style={styles.modalText}>Confirme sua senha: </NameAlter>
              <InputConfirmAlteraSenha
                user={userFields}
                setUser={setUser}
                placeholder="Confirme sua nova senha"
              />

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  updateUserHandler(user.id, userFields); 
                  setModalVisible(false);
                }}>
                <NameAlter style={styles.textStyle}>Salvar Dados</NameAlter>
              </TouchableOpacity>
            </ContainerAlter>
          </View>
        </Modal>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
              <Text style={styles.campotext1}>EDITAR INFORMAÇÕES</Text>
            </TouchableOpacity>
          </View>
        </ContainerData>
        <View style={styles.viewTitle}>
          <NameBlue style={styles.title}>CONFIGURAÇÕES</NameBlue>
        </View>
        <View style={styles.viewSubTitle}>
          <Text style={styles.subTitle}>FEED</Text>
        </View>
        <View style={styles.aliner}>
          <ContainerData style={styles.containerDataFeed}>
            <Name>Notícias</Name>
          </ContainerData>
          <ContainerData style={styles.containerDataFeed}>
            <Name>Universidades</Name>
          </ContainerData>
        </View>
        <TouchableOpacity onPress={() => setShowResetModal(true)} style={styles.button}>
          <Text style={styles.textButton}>REDIFINIR SENHA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.textButton}>LOGOUT</Text>
        </TouchableOpacity>
      </Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResetModal}
        onRequestClose={() => {
          setShowResetModal(!showResetModal);
        }}>
        <View style={styles.centeredView}>
          <ContainerAlter style={styles.modalView}>
            <NameAlter style={styles.modalText}>Email para redefinir senha:</NameAlter>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor={'#8F8F8F'}
                  value={emailForReset}
                  onChangeText={(text) => setEmailForReset(text)}
                />
              </BackgroundInput>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleResetPasswordRequest}>
              <NameAlter style={styles.textStyle}>Enviar E-mail de Redefinição</NameAlter>
            </TouchableOpacity>
            <NameAlter style={styles.modalText}>Token:</NameAlter>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Token"
                  placeholderTextColor={'#8F8F8F'}
                  value={token}
                  onChangeText={(text) => setToken(text)}
                />
              </BackgroundInput>
            </View>
            <NameAlter style={styles.modalText}>Nova Senha:</NameAlter>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nova Senha"
                  placeholderTextColor={'#8F8F8F'}
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  secureTextEntry
                />
              </BackgroundInput>
            </View>
            <NameAlter style={styles.modalText}>Confirmar Nova Senha:</NameAlter>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Confirmar Nova Senha"
                  placeholderTextColor={'#8F8F8F'}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry
                />
              </BackgroundInput>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleResetPassword}>
              <NameAlter style={styles.textStyle}>Redefinir Senha</NameAlter>
            </TouchableOpacity>
          </ContainerAlter>
        </View>
      </Modal>
    </>
  );
};
