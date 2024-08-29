import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import Drawer from './drawer';
import { Header } from '../components/addHeader/header';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { styles } from '../styles/stylePerfilUser';
import { Name, NameBlue } from '@theme/style';
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
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Image style={styles.Logo} source={{ uri: dirImagem }}></Image>
        </TouchableOpacity>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <View style={styles.perfil}></View>
        <View style={styles.containerNick}>
          <Text style={styles.nick}>{userData?.name}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.seg}>
            <Text>Seguidores</Text>
          </View>

          <View style={styles.seg}>
            <Text>Publicações</Text>
          </View>
        </View>
        <View style={styles.viewTitle}>
          <NameBlue style={styles.title}>DADOS PESSOAIS</NameBlue>
        </View>
        <View style={styles.containerData}>
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
          <Button title='Redefinir senha' onPress={toggleDrawer} />
        </View>
        <View style={styles.viewTitle}>
          <NameBlue style={styles.title}>CONFIGURAÇÕES</NameBlue>
        </View>
        <View style={styles.viewSubTitle}>
          <Text style={styles.subTitle}>FEED</Text>
        </View>
        <View style={styles.aliner}>
          <View style={styles.containerDataFeed}>
            <Name>Notícias</Name>
          </View>
          <View style={styles.containerDataFeed}>
            <Name>Universidades</Name>
          </View>
        </View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </>
  );
};

