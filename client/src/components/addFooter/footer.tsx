import React from 'react';
import { Pressable, View, Image } from 'react-native';
import { styles } from './footerStyle';


const dirIconHouse = require("../../../assets/imagens/icon_casa_cheio.png");
const dirIconGlass = require("../../../assets/imagens/icon_lupa_vazio.png");
const dirIconSaved = require("../../../assets/imagens/icon_salvos_vazio.png");
const dirIconProfile = require("../../../assets/imagens/icon_perfil_vazio.png");

export function Footer() {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button}><Image source={dirIconHouse} style={styles.icon}/></Pressable>
            <Pressable style={styles.button}><Image source={dirIconGlass} style={styles.icon}/></Pressable>
            <Pressable style={styles.button}><Image source={dirIconSaved} style={styles.icon}/></Pressable>
            <Pressable style={styles.button}><Image source={dirIconProfile} style={styles.icon}/></Pressable>
        </View>
    );
}