import { StyleSheet, Image } from "react-native";

export default function ImageViewer({diretorio}:{diretorio:any}){
    return(
        <Image source={diretorio} style={estilo.image}/>
    );
}

const estilo = StyleSheet.create({
    image:{
        width: 50,
        height: 50,
        borderRadius: 18
    }
});