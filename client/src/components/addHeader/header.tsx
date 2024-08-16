import { styles } from './styleheader';
import React from 'react';
import { View, StatusBar,  SafeAreaView, Text } from 'react-native';
import { Container, NameBlue, Name, Line } from '../../theme/style';
import ImageViewer from '../addImageViewer/ImageViewer';

export function Header() {
  const dirImagem = require('../../../assets/imagens/tcc-logo-quadrado-sem-fundo.png');
  return (
    <>
    <StatusBar></StatusBar>
     <SafeAreaView style={styles.container2}>
      
     </SafeAreaView>
    <Container style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <ImageViewer diretorio={dirImagem} />
        </View>
        <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
        <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
      </View>
      <Line style={styles.line} />
    </Container>
    </>
  );
}
