import { styles } from './styleBigHeader';
import React from 'react';
import { View, Image } from 'react-native';
import { Container, NameBlue, Name } from '../../theme/style';

export function BigHeader() {
  const ftpImageUrl = 'http://projetoscti.com.br/projetoscti27/uninews/img/tcc-logo-quadrado-sem-fundo.png';

  return (
    <Container style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.img}>
          <Image style={styles.img1} source={{uri: ftpImageUrl}} />
        </View>
        <View style={styles.containerTitleLogo}>
          <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
          <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
        </View>
      </View>
    </Container>
  );
}
