import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderWidth: 3,
        borderRadius: 15,
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: responsiveHeight(1),
        marginRight: responsiveWidth(2),
    },
    icon:{
        width: responsiveWidth(5),
        height: responsiveHeight(3),
        }
});