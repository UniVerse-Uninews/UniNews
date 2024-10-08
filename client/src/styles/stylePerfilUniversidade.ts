import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container1:{flex: 1},
    container2:{
        flexDirection:'row'
    },
    container3:{
        flexDirection:'column',
        marginTop: responsiveScreenHeight(3),
        marginLeft: responsiveScreenWidth(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width:responsiveScreenWidth(30),
        height:responsiveScreenHeight(16),
        marginTop: responsiveScreenHeight(4),
        marginLeft: responsiveScreenWidth(2),
        resizeMode:'stretch'
        
    },
    image1:
    {
        width:responsiveScreenWidth(32),
        height:responsiveScreenHeight(16),
        borderRadius: responsiveScreenWidth(2),
        borderWidth:responsiveScreenWidth(0.4),
        borderColor:'#3c6294',
        marginLeft: responsiveScreenWidth(4.5),
        resizeMode:'stretch'
    },
    description1:{
        borderWidth:responsiveScreenWidth(0.6),
        borderRadius:responsiveScreenWidth(3),
        width: responsiveScreenWidth(50),
        padding:responsiveFontSize(1),
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight:responsiveScreenHeight(16),
    },
    name:
    {
        marginBottom: responsiveScreenHeight(1),
        fontSize: responsiveFontSize(2.5)
    },
    news:
    {
        borderWidth:responsiveScreenWidth(0.6),
        borderRadius:responsiveScreenWidth(6),
        height: responsiveScreenHeight(4),
        width: responsiveScreenWidth(80),
        justifyContent:'center',
        paddingLeft:responsiveScreenWidth(4)
    },
    container4:
    {
        width: '100%',
        alignItems:'center',
        marginTop: responsiveScreenHeight(4)
    },
    name1:
    {
        fontSize: responsiveFontSize(2)
    },

    followButton:
    {
        marginTop: responsiveScreenHeight(2),
        padding: responsiveFontSize(1),
        borderRadius: responsiveScreenHeight(1.5),
        width: responsiveScreenWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveScreenHeight(2)
    },

    followButtonText:
    {
        fontSize: responsiveFontSize(2)
    },
    contTitle:{
        flexDirection:'row',
        borderWidth:responsiveScreenWidth(0.4),
        alignItems: 'center',
        marginLeft: responsiveScreenWidth(5),
        padding:responsiveFontSize(0.5),
        borderRadius:responsiveScreenWidth(7),
        width: '90%',
    },
    title :{
        fontSize: responsiveFontSize(3),
        fontFamily: 'Teacher',
        marginLeft: responsiveScreenWidth(2),
    },
});