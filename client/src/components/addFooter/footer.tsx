import React from 'react';
import { Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack'; // Atualize o caminho conforme necessário
import { styles } from './footerStyle';
import { BorderColorBlue, Container } from '@theme/style';

const dirIconHouse = require('../../../assets/imagens/icon_casa_cheio.png');
const dirIconGlass = require('../../../assets/imagens/icon_lupa_vazio.png');
const dirIconSaved = require('../../../assets/imagens/icon_salvos_vazio.png');
const dirIconProfile = require('../../../assets/imagens/icon_perfil_vazio.png');

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Footer() {
    const navigation = useNavigation<FooterNavigationProp>();

    return (
        <>
            <BorderColorBlue style={styles.line} />
            <Container style={styles.container}>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Feed')}
                >
                    <Image source={dirIconHouse} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Pesquisar')}
                >
                    <Image source={dirIconGlass} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('LerNoticia')}
                >
                    <Image source={dirIconSaved} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Image source={dirIconProfile} style={styles.icon} />
                </Pressable>
            </Container>
        </>
    );
}
