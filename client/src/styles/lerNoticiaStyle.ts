import { StyleSheet } from 'react-native';
import {
  responsiveScreenHeight,
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    icons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back:{
        marginLeft: responsiveScreenHeight(2),
        marginTop: responsiveScreenHeight(2),
        height: responsiveHeight(4),
        width: responsiveWidth(7),
    },
    card: {
        width: '100%',
        padding: responsiveWidth(2),
        marginBottom: responsiveWidth(2),
        
    },
    imageCard: {
        width: '100%',
        height: responsiveScreenHeight(35),
        borderRadius: 10,
        marginTop: responsiveHeight(2),

    },
    title: {
        marginTop: responsiveHeight(1),
        fontSize: responsiveFontSize(5),
        fontWeight: 'bold',
        marginLeft: responsiveWidth(1),
    },
    text: {
        marginLeft: responsiveHeight(3),
        fontSize: responsiveFontSize(2),
    },
    data: {
        paddingLeft: 5,
        marginRight: responsiveHeight(3),
    },
    containerIcon:{
        marginTop: responsiveScreenHeight(2),
        marginRight: responsiveWidth(2),
    },
    icon:{
        width: responsiveWidth(7),
        height: responsiveHeight(4),
        },
    infos:{
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
        marginBottom:responsiveHeight(1.5),
    }
});