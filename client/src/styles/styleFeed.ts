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
        top: responsiveHeight(1),
        alignSelf: 'flex-start',
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
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#f5b304',
        borderWidth: 1,
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

    profileImageContainer: {
        position: 'absolute',
        right: responsiveWidth(2), 
        top: responsiveHeight(2),  
        width: responsiveWidth(10), 
        height: responsiveHeight(5), 
        overflow: 'hidden',
      },
      
      profileImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        },

      textContainer: {
        paddingRight: responsiveWidth(15), 
      },
});
