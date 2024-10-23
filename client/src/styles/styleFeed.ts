import { Line } from '@theme/style';
import { StyleSheet } from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: responsiveFontSize(2),
    },
    contLine: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: responsiveHeight(0.5),
        paddingBottom: responsiveHeight(1),
    },
    line: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.3,
        width: '90%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#0571D3',
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
        borderRadius: responsiveWidth(2),
        marginBottom: responsiveHeight(2),
        borderWidth: responsiveWidth(0.3),
        resizeMode: 'stretch',
        borderColor: '#000000',
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontFamily: 'RubikBold',
        marginBottom: responsiveHeight(1),
    },
    title1: {
        fontSize: responsiveFontSize(4.5),
        fontFamily: 'Teacher',
        marginVertical: responsiveHeight(1.5),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(2),
    },
    data: {
        marginBottom: responsiveHeight(2),
    },
    text: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.7),
    },

    saveIcon: {
        width: responsiveWidth(9),
        height: responsiveHeight(4),
        alignItems: 'flex-start',
        resizeMode: 'contain',
      
    },

    tabText: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
    },
    tabTextActive: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'RubikBold',
    },
    tabTextInactive: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'RubikBold',
        opacity: 0.5,
    },

    tabButton: {
        padding: responsiveHeight(1),
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#f5b304',
        borderWidth: 1,
        marginVertical: responsiveHeight(1),
        width: responsiveWidth(22),
        marginTop: responsiveHeight(2),


    },

    tabButtonActive: {

    },
    tabButtonInactive: {
    },

    headerTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },

    separator: {
        width: 1,
        backgroundColor: '#ccc',
        height: '100%',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileImageContainer: {
        position: 'relative',
        right: responsiveWidth(2),
        width: responsiveWidth(13),
        height: responsiveHeight(4),
        overflow: 'hidden',
        marginBottom: responsiveHeight(2.7),
        justifyContent: 'center',
    },
    profileNameContainer: {	
        justifyContent: 'center',  
        alignItems: 'center', 
        height: responsiveHeight(3),
        borderWidth: 1,
        borderRadius: 10,

        width: '90%',
        marginTop: responsiveHeight(0.5),
    },
    profileImage: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
    },
    contImgMais: {
        alignItems: 'flex-end',
        width: '100%',
    },
    profileImageMais: {
        resizeMode: 'contain',
        width: responsiveWidth(10),
        height: responsiveHeight(4),
    },

    textContainer: {
        paddingRight: responsiveWidth(15),
    },
    iconContainerUni: {
        flexDirection: 'row',
        width: '35%',
        display: 'flex',
        justifyContent: 'center',
        },

     textUni: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.7),
        fontFamily: 'RubikBold',
    },   
});
