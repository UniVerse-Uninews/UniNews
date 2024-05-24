import { StyleSheet } from "react-native";
import { Container } from "../theme/style";
import { responsiveFontSize, responsiveScreenFontSize } from "react-native-responsive-dimensions";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      title: {
        fontSize: responsiveScreenFontSize(3),
        fontFamily: 'Teachers Students',
        textAlign: 'left',
        position: 'absolute',
        marginLeft: '5%',
        marginTop: '2%',
        color: '#FFFFFF',
      },
      subtitle: {
        fontSize: responsiveScreenFontSize(2),
        fontFamily: 'Rubik_400Regular',
        textAlign: 'left',
        marginLeft: '13%',
        marginTop: '5%',
        color: '#000',
      },
      containerInput: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
      },
      input: {
        height: '100%',
        fontFamily: 'Rubik_400Regular',
        width: '80%',
        borderColor:'#F2A20C',
      },
      inputArea: {
        borderWidth: 1,
        borderRadius: 15,
        height: '70%',
        paddingLeft: 5,
        marginTop: '3%',
        width: '65%',
        borderColor:'#F2A20C',
        flexDirection: 'row',
      },
      containerDados: {
        width: '70%',
        borderWidth: 5,
        borderRadius: 25,
        borderColor: '#4A94CC',
      },
      containerCadastro: {
        width: '100%',
        backgroundColor: '#4A94CC',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: '10%',        
      },
      icon: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2A20C',
      },
});