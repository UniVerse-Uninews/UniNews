import React from "react";
import {StyleSheet, Text, Pressable, View } from "react-native";
import {styles} from './buttonStyle';


export function Button({etiqueta, aoClicar}:{etiqueta: any,aoClicar:any}){
    return (
        <View style={styles.botaoContainer}>
            <Pressable style={styles.botao} 
                onPress={aoClicar}>
                <Text style={styles.etiqueta}>{etiqueta}</Text>
            </Pressable>
        </View>
    );
   
}
export default Button;