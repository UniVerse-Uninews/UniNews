
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
const dirImagem = require('../../assets/imagens/tcc-logo-quadrado-sem-fundo.png');


export  function Sobre() {
  return (
    <>
      
        <Header />
        <Container style={styles.container}>
        <ScrollView>
            <Name style={styles.sobre}>Sobre o Projeto</Name>
            <View style={styles.titulo}>
              <Image style={styles.Logo} source={dirImagem} />
              
              <Name style={styles.subtitulo1} >Este projeto trata-se de um veiculador mobile de notícias e pesquisas universitárias. </Name>
            </View>

            <Name style={styles.subtitulo}>O principal intuito desta plataforma é não apenas facilitar o acesso a informações acadêmicas, mas também apresentá-las de maneira confiável e diretamente da fonte, direcionadas aos interesses do usuário.</Name>
          
            <Name style={styles.sobre}>Quem Somos</Name>
            <View style={styles.titulo}>
              <Image style={styles.Logo} source={dirImagem} />
              
              <Name style={styles.subtitulo1} >Ryandro maravilhoso. </Name>
            </View>
            

            
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
