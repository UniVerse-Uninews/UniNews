import React, { useEffect } from 'react';
import { Pressable, Image } from 'react-native';
import {  useNavigation, useRoute } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack';
import { styles } from './footerStyle';
import { BorderColorBlue, FooterContainer, Line } from '@theme/style';
import { useAuth } from 'src/context/authContext';
import { useAuthCheck } from 'src/context/authNavigation';



const dirIconHouse = require('../../../assets/imagens/icon_casa_cheio.png')
const dirIconNotHouse = require('../../../assets/imagens/icon_casa_vazio.png')
const dirIconSearch = require('../../../assets/imagens/icon_lupa_cheio.png')
const dirIconGlass = require('../../../assets/imagens/icon_lupa_vazio.png')
const dirIconUnsaved = require('../../../assets/imagens/icon_salvos_cheio.png')
const dirIconSaved = require('../../../assets/imagens/icon_salvos_vazio.png')
const dirIconProfileFull = require('../../../assets/imagens/icon_perfil_cheio.png')
const dirIconProfile = require('../../../assets/imagens/icon_perfil_vazio.png')
const dirIconCrudUniversidade = require('../../../assets/imagens/icon_btn_edit_uni.png') 
const dirIconCrudUsuario = require('../../../assets/imagens/icon_btn_edit_user.png') 

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Footer() {
    const navigation = useNavigation<FooterNavigationProp>();
    const route = useRoute();
    const currentRoute = route.name;
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
                    <Image source={currentRoute === 'Feed'? dirIconHouse: dirIconNotHouse } style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('Pesquisar', 
                        {navigation}
                        )}
                >
                    <Image source={ currentRoute === 'Pesquisar'? dirIconSearch : dirIconGlass } style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('LerNoticia')}
                    
                >
                    <Image source={currentRoute==='LerNoticia'? dirIconUnsaved:dirIconSaved } style={styles.icon} />
                </Pressable>
                <Pressable 
                    style={buttonStyle}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Image source={ currentRoute==='Perfil'? dirIconProfileFull:dirIconProfile } style={styles.icon} />
                </Pressable>

                {isAdmin && (
                    <>
                        <Pressable 
                            style={buttonStyle}
                            onPress={() => navigation.navigate('CrudUniversidade')}
                        >
                            <Image source={dirIconCrudUniversidade } style={styles.icon} />
                        </Pressable>
                        <Pressable 
                            style={buttonStyle}
                            onPress={() => navigation.navigate('CrudUsuario')}
                        >
                            <Image source={ dirIconCrudUsuario } style={styles.icon} />
                        </Pressable>
                    </>
                )}
            </FooterContainer>
        </>
    );
}

