
import { Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Header } from '../components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import {
  Name,
  Container,
  NameBlue,
  Textbox,
  Subbox,
} from '../theme/style';
import { styles } from '../styles/styleSobre';


export  function Sobre() {
  return (
    <>
      
        <Header />
        <Container style={styles.container}>
        <ScrollView>
            <Name style={styles.sobre}>Quem somos</Name>

            
            <View style={styles.perfil}>
                <View style={styles.foto}></View>
                <View >
                <Name>Ryandro Lindo</Name> 
                <Name>Lindo Demais</Name>
                </View>
               
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto}></View>
                <View >
                <Name>Ryandro Lindo</Name> 
                <Name>Gostoso demais</Name>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto}></View>
                <View >
                <Name>Ryandro Lindo</Name> 
                <Name>Muito Gato</Name>
                </View>
                
            </View>
         
        </ScrollView>
        </Container>
    
      <Footer />
    </>
  );
}
