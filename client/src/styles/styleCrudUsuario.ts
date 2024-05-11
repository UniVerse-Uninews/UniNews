import { StyleSheet } from "react-native";
import Button from "../components/addButton/button";

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
     containerDados: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center', 
      marginLeft: '2%',
      marginTop:'5%',
    },
    viewDados: { 
      width: '50%',
      marginHorizontal: 8,
      marginTop: 10
    },
    titulo: {
      fontSize: 30,
      margin: '4%',
      color: '#0571D3',
      fontFamily: 'Teachers Students',
    },
    imageContainer: {
      width: 50,
      padding: '1%'
    },
    containerInput: { 
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#F3C63B',
      padding: 5,
    },
    input: {
      borderColor: '#4A92C7',
      borderWidth: 1,
      borderRadius: 5,
      height: 30,
      fontFamily: 'Rubik',
      paddingLeft: 5,
    },
    containerButton: {
      margin: 30,
    },
    campos: {
      marginTop: 7,
      fontFamily: 'Rubik',
    },
    radio: {
      height: 35
    },
    containerTable: { 
      width: '100%',
      height: '35%',
      marginTop: '5%',
      marginLeft: '2%' },
    table: { 
      width: '90%',
      height: '100%',
      borderWidth: 2,
      borderColor: '#F3C63B',
      borderRadius: 10 },
  });