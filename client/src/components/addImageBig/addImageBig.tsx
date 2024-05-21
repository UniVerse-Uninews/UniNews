import { StyleSheet, Image } from "react-native";
import React from "react";
import { styles } from "./styleImageBig";


export function ImageBig({diretorio}:{diretorio:any}){
    return(
        <Image source={diretorio} style={styles.image}/>
    );
}