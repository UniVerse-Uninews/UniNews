import React, {useRef, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import ImageViewer from '../components/addImageViewer/ImageViewer';
import { styles } from '../styles/stylePerfil';

const dirImagem = require('../../assets/imagens/menu.png');
const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'right' | 'left'>(
    'right',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Button
        title="Close "
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );


  return (
    <>
     
     <DrawerLayoutAndroid 
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={navigationView}>
        <Header/>
     
      <ScrollView>
      <View style={styles.drawer}>
      <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
      <Image
        style={styles.Logo}
        source={require('../../assets/imagens/menu.png')}
      />
      </TouchableOpacity>
      </View>
      
           

           <View style={styles.container}>
               
               <View style={styles.perfil}>
               
               </View>
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
    
    <Footer/>
    </DrawerLayoutAndroid>
    </>
  );
};

export default App;
