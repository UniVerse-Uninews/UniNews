import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fffff',
      flex: 1,
    },
    cabecalho: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      paddingLeft: '2.5%',
      paddingTop: '2.5%',
      backgroundColor: '#FFF',
      height: '6%',
      alignItems: 'center',
    },
    line: {
      borderBottomColor: '#0571D3',
      borderWidth: 3,
      borderColor:'#FFF',
      marginTop: '2.5%',
      width: '100%',
    },
    nomeLogoAzul:{
      color: '#0571D3',
      marginLeft: '3%',
      fontSize: 50,
      fontFamily: 'Teachers Students',

    },
     nomeLogoPreto:{
      color: '#000',
      marginLeft: 0,
      fontSize: 50,
      fontFamily: 'Teachers Students',
     },
    titulo: {
      fontSize: 30,
      padding: '2.5%'
    },
    imageContainer: {
      width: 50,
      padding: '1%'
    },
    input: {
      borderColor: '#4A92C7',
      borderWidth: 1,
      borderRadius: 5,
      height: 30
    },
    botoes: {
      margin: 30
    },
    campos: {
      marginTop: 7
    },
    radio: {
      height: 35
    }
  });