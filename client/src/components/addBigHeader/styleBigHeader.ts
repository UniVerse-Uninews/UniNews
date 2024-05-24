import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height:'32%',
        width: '100%',
        
      },
      cabecalho: {
        marginTop: '10%',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        height: '100%',
      },
      img: {
        width: '50%',
        height: '50%',  
        marginLeft: '15%', 
      },
      containerTitleLogo:{
        flexDirection: 'row',
      },
      nameLogo:{
        marginLeft: '3%',
        fontSize: responsiveFontSize(6),
        fontFamily: 'Teachers Students',
        color: '#4A94CC',
      },
      nameLogoSecondary:{
        fontSize: responsiveFontSize(6),
        fontFamily: 'Teachers Students',
      },
});