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
    data: {
        marginBottom: responsiveHeight(2),
    },
    text: {
        fontSize: responsiveFontSize(1.6),
        marginBottom: responsiveHeight(0.7),
    },

    saveIcon: {
        width: responsiveWidth(8),
        height: responsiveHeight(4),
        position: 'absolute',
        right: responsiveWidth(2),
        bottom: responsiveHeight(1),
    },

    tabText: {  
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
    },
    tabTextActive: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
        color: '#0072bc',
    },
    tabTextInactive: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'RubikBold',
        color: '#ccc',
    },

    tabButton: {
        padding: responsiveHeight(1),
        flex: 1,
        alignItems: 'center',
    },
    tabButtonActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#0072bc',
    },
    tabButtonInactive: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },

    headerTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#343434',
        alignItems: 'center',
    },
    
    separator: {
        width: 1,
        backgroundColor: '#ccc',
        height: '100%',
    },
});
