import { styles } from './styleBigHeader';
import React from 'react';
import { View } from 'react-native';
import { Container, NameBlue, Name } from '../../theme/style';
import { ImageBig } from '../addImageBig/addImageBig';
export function BigHeader() {
    const dirImagem = require('../../../assets/imagens/tcc-logo-quadrado-sem-fundo.png');
    return (
        <Container style={styles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.img}>
                    <ImageBig diretorio={dirImagem} />
                </View>
                <View style={styles.containerTitleLogo}>
                    <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
                    <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
                </View>
            </View>
        </Container>
    );
}