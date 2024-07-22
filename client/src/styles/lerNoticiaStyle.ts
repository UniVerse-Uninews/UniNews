import { StyleSheet } from 'react-native';
import {
  responsiveScreenHeight,
    responsiveHeight,
    responsiveWidth,
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
        height: 300,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        margin: responsiveHeight(0.7)
    },
    data: {
        paddingLeft: 5
    },
    containerIcon:{
        marginTop: responsiveScreenHeight(2),
        marginRight: responsiveWidth(2),
    },
    icon:{
        width: responsiveWidth(7),
        height: responsiveHeight(4),
        }
});