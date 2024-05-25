import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fffdf6',
        alignItems: 'center',


    },
    box: {
        borderWidth: 2,
        backgroundColor: '#ffffff',
        width: responsiveScreenWidth(85),
        height: responsiveScreenHeight(65),
        borderRadius: 10,
        borderColor: '#4A94CC',
        position: 'relative',
        alignItems: 'center',
        paddingTop: '7%',
        justifyContent: 'space-around',

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
    },
    campo: {
        width: '90%',
        marginBottom: 10,
    },
    campotext: {
        marginLeft: 29,
    },
    button: {
        borderWidth: 2,
        borderColor: '#4A94CC',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4A94CC',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '8%',
        marginHorizontal: '1%'

    },
    textbutton: {
        color: '#fff',
        fontSize: responsiveFontSize(2),
    },
    button2: {
        borderWidth: 2,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '8%',
        marginHorizontal: '1%',
        marginBottom: '5%',
    },
    textbutton2: {
        color: '#000000',
        fontSize:responsiveFontSize(2),
    },
    boxbutton: {
        flexDirection: 'row',
        justifyContent: 'center'


    },
    text: {
        padding: '3%',

    },
    logo: {
        flexDirection: 'row',
        position: 'relative',
        padding: responsiveScreenHeight(10),
    },
    Uni: {
        fontSize: responsiveFontSize(6),
        color: '#4A94CC',
    },
    News: {
        fontSize: responsiveFontSize(6),
        color: '#000000',
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },


});
