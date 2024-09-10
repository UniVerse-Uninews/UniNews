import React, { useEffect } from 'react';
import { Pressable, Image } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack';
import { styles } from './footerStyle';
import { BorderColorBlue, FooterContainer, Line } from '@theme/style';
import { useAuth } from 'src/context/authContext';
import { useAuthCheck } from 'src/context/authNavigation';



const dirIconHouse = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_casa_cheio.png';
const dirIconGlass = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_lupa_vazio.png';
const dirIconSaved = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_vazio.png';
const dirIconProfile = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_perfil_vazio.png';
const dirIconCrudUniversidade = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_btn_edit_uni.png'; 
const dirIconCrudUsuario = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_btn_edit_user.png'; 

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Footer() {
    const navigation = useNavigation<FooterNavigationProp>();
    const { user } = useAuth();
    const { checkAuth } = useAuthCheck();
  
    
    useEffect(() => {
        checkAuth();
    }, []);

    const isAdmin = user?.role === 'ADMIN';
    const buttonStyle = isAdmin ? styles.button1 : styles.button;

    return (
        
            <>
            <Line style={styles.line} />
            <FooterContainer style={styles.container}>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate(user ? 'Feed' : 'Login')}
                >
                    <Image source={{ uri: dirIconHouse }} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('Pesquisar', 
                        {navigation}
                        )}
                >
                    <Image source={{ uri: dirIconGlass }} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('LerNoticia')}
                >
                    <Image source={{ uri: dirIconSaved }} style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Image source={{ uri: dirIconProfile }} style={styles.icon} />
                </Pressable>

                {isAdmin && (
                    <>
                        <Pressable 
                            style={buttonStyle}
                            onPress={() => navigation.navigate('CrudUniversidade')}
                        >
                            <Image source={{ uri: dirIconCrudUniversidade }} style={styles.icon} />
                        </Pressable>
                        <Pressable 
                            style={buttonStyle}
                            onPress={() => navigation.navigate('CrudUsuario')}
                        >
                            <Image source={{ uri: dirIconCrudUsuario }} style={styles.icon} />
                        </Pressable>
                    </>
                )}
            </FooterContainer>
        </>
    );
}
