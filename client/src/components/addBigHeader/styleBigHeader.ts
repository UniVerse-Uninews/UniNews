import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height:'35%',
        width: '100%',
        
      },
      cabecalho: {
        marginTop: '15%',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      img: {
        width: '50%',
        height: '70%',   
      },
      containerTitleLogo:{
        flexDirection: 'row',
        marginBottom: '5%',
      },
      nameLogo:{
        marginLeft: '3%',
        fontSize: 50,
        fontFamily: 'Teachers Students',
        color: '#4A94CC',
      },
      nameLogoSecondary:{
        fontSize: 50,
        fontFamily: 'Teachers Students',
      },
});