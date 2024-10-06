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
        resizeMode: 'stretch'
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
        width: responsiveWidth(8),
        height: responsiveHeight(3),
        alignItems: 'flex-start',
        resizeMode: 'contain',
    },

    tabText: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
    },
    tabTextActive: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
    },
    tabTextInactive: {
        fontSize: responsiveFontSize(2),
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
        width: responsiveWidth(30),
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

    profileImage: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
    },
    profileImageMais: {
        resizeMode: 'contain',
        width: '80%',
        height: '80%',
    },

    textContainer: {
        paddingRight: responsiveWidth(15),
    },
    iconContainerUni: {
        flexDirection: 'row',
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        },

     textUni: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.7),
        fontFamily: 'RubikBold',
        color: '#f5b304',
    },   
});
