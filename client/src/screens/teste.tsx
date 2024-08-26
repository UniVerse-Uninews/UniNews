// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Drawer from './drawer';
import { Header } from '../components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';


const Teste = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const dirImagem = 'http://projetoscti.com.br/projetoscti27/uninews/img/menu.png';
  const { user } = useAuth();
  const { checkAuth, handleLogout } = useAuthCheck();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
    <Header/>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Image style={styles.Logo} source={{uri: dirImagem}}></Image>
      </TouchableOpacity>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
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
            <Button title="Logout" onPress={handleLogout} />
    </View>
    <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    alignItems:'center',
    paddingTop:10,
    flexDirection: 'column',
  },
  menuButton: {

    marginLeft:'80%'
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
  },
  perfil:{
    marginTop:'3%',
    padding:'15%',
    borderWidth:2,
    width:'10%',
    borderRadius:90,

},
nick:{
    padding:'3%',
    fontSize:18,
},
seg:{
    padding:'2%',
},
box:{
    flexDirection:'row',
},
drawer:{
    flex: 1,   
    paddingTop:10,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column',
    marginLeft:'80%',
     
},
Logo:{
    width:30,
    height:30
}
});

export default Teste;
