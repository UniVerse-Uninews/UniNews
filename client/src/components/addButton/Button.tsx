import React from "react";
import {StyleSheet, Text, Pressable, View } from "react-native";
import {styles} from './buttonStyle';


export default function Button({etiqueta, handlePress}:{etiqueta: any,handlePress:any}){
    return (
        <View style={styles.botaoContainer}>
            <Pressable style={styles.botao} 
                onPress={handlePress}>
                <Text style={styles.etiqueta}>{etiqueta}</Text>
            </Pressable>
        </View>
    );
   
}