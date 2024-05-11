import React from "react";
import {StyleSheet, Text, Pressable, View } from "react-native";

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

const estilos = StyleSheet.create({
    botaoContainer: {
      width: 125,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      marginTop: 15
    },
    botao: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0571D3'
    },
    etiqueta: {
      fontSize: 13,
      color: '#fff'
    },
  });