import React, { useRef, useState } from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/stylePerfil';

export function Perfil() {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'right' | 'left'>('right');
  const dirImagem = require('../../assets/imagens/menu.png');

  const changeDrawerPosition = () => {
    setDrawerPosition(prevPosition => (prevPosition === 'left' ? 'right' : 'left'));
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Button title="Close" onPress={() => drawer.current?.closeDrawer()} />
    </View>
  );

  return (
    <>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <Header />
        <ScrollView>
          <View style={styles.drawer}>
            <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
              <Image style={styles.Logo} source={dirImagem} />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.perfil}></View>
            <Text style={styles.nick}>Ryandro Zerlin Moriizumi</Text>

            <View style={styles.box}>
              <View style={styles.seg}>
                <Text>Seguidores</Text>
              </View>

              <View style={styles.seg}>
                <Text>Publicações</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer />
      </DrawerLayoutAndroid>
    </>
  );
}
