import { StyleSheet } from 'react-native';
import {
    responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(1),
        marginRight: responsiveWidth(1),
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: responsiveHeight(2),
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: responsiveHeight(1),  
        borderRadius: 5,
        marginVertical: responsiveHeight(2),
    },
    viewCard: {
        marginBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(2),
    },
    card: {
        padding: responsiveHeight(1.5),
        borderWidth: 1,
        borderRadius: 10,
    },
    imageCard: {
        width: '100%',
        height: responsiveHeight(23),
        borderRadius: 10,
        marginBottom: responsiveHeight(2),
        borderWidth: 1,
        resizeMode: 'stretch'
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontFamily: 'RubikBold',
        marginBottom: responsiveHeight(1),
    },
    data: {
        marginBottom: responsiveHeight(2),
    },
    text: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.7),
    },
});
