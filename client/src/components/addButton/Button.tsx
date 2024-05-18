import React from "react";
import {StyleSheet, Text, Pressable, View } from "react-native";
import {styles} from './buttonStyle';
import {ColorButton} from '../../theme/style';


export default function Button({etiqueta, handlePress}:{etiqueta: any,handlePress:any}){
    return (
        <View style={styles.botaoContainer}>
            <ColorButton style={styles.botao} 
                onPress={handlePress}>
                <Text style={styles.etiqueta}>{etiqueta}</Text>
            </ColorButton>
        </View>
    );
   
}