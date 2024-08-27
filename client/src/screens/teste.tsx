// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Drawer from './drawer';
import { Header } from '../components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { useAuth } from '../context/authContext';
import { useAuthCheck } from '../context/authNavigation';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Name, NameBlue } from '@theme/style';


const Teste = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <>
    <Header/>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Image style={styles.Logo} source={{uri: dirImagem}}></Image>
      </TouchableOpacity>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <View style={styles.perfil}></View>
      <View style={styles.containerNick}>
            <Text style={styles.nick}>Ryandro Zerlin Moriizumi</Text>
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
              <Name style={styles.campotext}>Username</Name> 
                <TouchableOpacity onPress={toggleDrawer}>
                <Image source={{uri:dirImagem2}} style={styles.icon}/>
                </TouchableOpacity>
                </View>
                <View style={styles.box}>
                  <Name style={styles.campotext}>Email </Name>
                  <TouchableOpacity onPress={toggleDrawer}>
                    <Image source={{uri:dirImagem2}} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
              <Button title='Redefinir senha' onPress={toggleDrawer}/>
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
containerNick:{
    margin:'3%',
    borderColor:'#F2A20C',
    borderWidth:1,
    borderRadius:20,
    backgroundColor:'#fff',
},
nick:{
    padding:'2%',
    fontSize:responsiveFontSize(2),
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
},
title:{
    fontSize:responsiveFontSize(4.5),
    marginTop:'5%',
    marginLeft:'5%',
    fontFamily:'Teacher',
},
viewTitle:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:'5%',
    
},
viewSubTitle:{
  flexDirection:'row',
  width:'100%',
  justifyContent:'flex-start',
  alignItems:'flex-start',
},
subTitle:{
  fontSize:responsiveFontSize(3.5),
  fontFamily:'Teacher',
  marginLeft:'15%',
  color:'#4A94CC',
},
campotext:{
    margin:'3%',
    fontSize:responsiveFontSize(1.8),
    fontFamily:'RubikNormal',
    marginRight:'7%',
    marginLeft:'15%',
},
icon:{
    width:responsiveWidth(4),
    height:responsiveHeight(2),
    marginTop:'50%',
},
containerData:{
  margin:'3%',
  borderColor:'#F2A20C',
  borderWidth:1,
  borderRadius:20,
  backgroundColor:'#fff',
  width:responsiveWidth(70),
  justifyContent:'center',
 
},
containerDataFeed:{
  margin:'3%',
  borderColor:'#F2A20C',
  borderWidth:1,
  borderRadius:10,
  backgroundColor:'#fff',
  width:responsiveWidth(25),
  height:responsiveHeight(3),
  justifyContent:'center',
  alignItems:'center',
},
aliner:{
  flexDirection:'column',
  width:'65%',
  justifyContent:'center',
  alignItems:'flex-start',
  margin:'3%',
},
});

export default Teste;
