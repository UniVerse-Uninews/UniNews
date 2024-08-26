import React from 'react';
import { Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack'; // Atualize o caminho conforme necessário
import { styles } from './footerStyle';
import { BorderColorBlue, FooterContainer } from '@theme/style';

const dirIconHouse ='http://projetoscti.com.br/projetoscti27/uninews/img/icon_casa_cheio.png';
const dirIconGlass = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_lupa_vazio.png';
const dirIconSaved ='http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_vazio.png';
const dirIconProfile = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_perfil_vazio.png';

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Footer() {
    const navigation = useNavigation<FooterNavigationProp>();

    return (
        <>
            <BorderColorBlue style={styles.line} />
            <FooterContainer style={styles.container}>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Image source={{uri: dirIconHouse}} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Pesquisar')}
                >
                    <Image source={{uri: dirIconGlass}} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('Feed')}
                >
                    <Image source={{uri: dirIconSaved}} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('teste')}
                >
                    <Image source={{ uri: dirIconProfile }} style={styles.icon} />
                </Pressable>
            </FooterContainer>
        </>
    );
}
