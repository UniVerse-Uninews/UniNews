import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import Drawer from './drawer';
import { Header } from '../components/addHeader/header';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { styles } from '../styles/stylePerfilUser';
import { BorderColorBackground, BorderColorBlue, Container, ContainerData, Name, NameBlue } from '@theme/style';
import { getUser } from '@services/api';
import { User } from 'src/@types/interfaces';


export function Perfil ()  {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState<User | null > (null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const dirImagem = 'http://projetoscti.com.br/projetoscti27/uninews/img/menu.png';
  const dirImagem2 = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_lapis_editar.png';
  const { user } = useAuth();
  const { checkAuth, handleLogout } = useAuthCheck();

  useEffect(() => {
    checkAuth();
  }, []);


  useEffect(() => {
    if (user && user.id) {
      getUser(user.id)
        .then((response) => {
          setUserData(response.data.user); 
          console.log(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <Header />
      <Container style={styles.container}>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
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
          <Name style={styles.campotext}>Username: {userData?.name}</Name>
            <TouchableOpacity onPress={toggleDrawer}>
              <Image source={{ uri: dirImagem2 }} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
          <Name style={styles.campotext}>Email: {userData?.email}</Name>
            <TouchableOpacity onPress={toggleDrawer}>
              <Image source={{ uri: dirImagem2 }} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.box1}>
            <TouchableOpacity style={styles.button} onPress={toggleDrawer}>
              <Text style={styles.campotext1}>Redefinir senha</Text>
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
        <Button title="Logout" onPress={handleLogout} />
    </Container>
    </>
  );
};

