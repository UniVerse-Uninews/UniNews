import React from "react";
import {StyleSheet, Text, Pressable, View } from "react-native";
import {styles} from './buttonStyle';


export default function Button({etiqueta, handlePress}:{etiqueta: any,handlePress:any}){
    return (
        <View style={estilos.botaoContainer}>
            <Pressable style={estilos.botao} 
                onPress={handlePress}>
                <Text style={estilos.etiqueta}>{etiqueta}</Text>
            </Pressable>
        </View>
    );
   
}
export default Button;