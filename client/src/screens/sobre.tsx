
import { Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Header } from '../components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import {
  Name,
  Container,
  NameBlue,
  NameBlueDark,
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
            <NameBlueDark style={styles.sobre}>Sobre Nós</NameBlueDark>
            <NameBlue style={styles.titulo1}>UNINEWS</NameBlue>
            <View style={styles.titulo}>
              <Image style={styles.Logo} source={dirImagem} />
              
              <Name style={styles.subtitulo1} >Este projeto trata-se de um veiculador mobile de notícias e pesquisas universitárias. </Name>
            </View>

            <Name style={styles.subtitulo}>O principal intuito desta plataforma é não apenas facilitar o acesso a informações acadêmicas, mas também apresentá-las de maneira confiável e diretamente da fonte, direcionadas aos interesses do usuário.</Name>
          
            <NameBlueDark style={styles.sobre}>Quem Somos</NameBlueDark>
            <NameBlue style={styles.titulo1}>UNIVERSE</NameBlue>
            <View style={styles.titulo}>
              <Image style={styles.Logo} source={dirImagem} />
              
              <Name style={styles.subtitulo1} >Ryandro maravilhoso. </Name>
            </View>
            
            <NameBlueDark style={styles.sobre}>Desenvolvedores</NameBlueDark>
            
            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Ana Lara Picalio</NameBlue> 
                <NameBlue>Desenvolvedora</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Arthur Ximenes Orsolini</NameBlue> 
                <NameBlue>PM/PO</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Carol Xavier Mazon</NameBlue> 
                <NameBlue>Desenvolvedora</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Gustavo Carvalho Polido</NameBlue> 
                <NameBlue>Desenvolvedor</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Miguel Angelo De Lima Godoi</NameBlue> 
                <NameBlue>Lider Técnico</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Pedro A. O. G. Ribeiro</NameBlue> 
                <NameBlue>Desenvolvedora</NameBlue>
                </View>
            </View>

            <View style={styles.perfil}>
                <View style={styles.foto1}>
                  <View style={styles.foto}>
                    
                  </View>
                </View>
                <View  style={styles.texto}>
                <NameBlue>Ryandro Zerlin Moriizumi</NameBlue> 
                <NameBlue>Lider UX/UI</NameBlue>
                </View>
            </View>
         
        </ScrollView>
        </Container>
    
      <Footer />
    </>
  );
}
