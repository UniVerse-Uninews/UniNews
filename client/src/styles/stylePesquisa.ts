import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container1:{
        flex: 1,
    },
    container2:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    container3:{
        flexDirection:'column',
        position: 'relative',
        
    },
    description:{
        borderWidth:3
    },
    contfiltro:
    {
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    filtro:{
        width: responsiveScreenHeight(3.5),
        height: responsiveScreenHeight(3.5),
        marginLeft: '7.5%',
    },
    title1:
    {
        fontFamily: 'Teacher',
        fontSize: responsiveFontSize(4.8),
        textAlign: 'left',
        marginLeft: '7%',
        marginTop: '5%',
        marginBottom: '1%',
        color: '#4A92C7',
    },
    pesquisa:{
        width:responsiveScreenWidth(60),
        borderRadius: responsiveScreenWidth(5),
        height: responsiveScreenHeight(4),
    },
    inputArea: {
        borderWidth: responsiveFontSize(0.2),
        borderRadius: responsiveScreenWidth(10),
        height: responsiveScreenHeight(4),
        paddingLeft: '5%',
        width: responsiveScreenWidth(70),
        borderColor: '#F2A20C',
        flexDirection: 'row',
        paddingBottom: '1%',
        backgroundColor: '#F5F5F5',
        marginVertical: '3%',
      },
      containerimpesqui:{
        width: responsiveScreenWidth(1),
        height: responsiveScreenHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    impesqui:{
        width: responsiveScreenWidth(5),
        height: responsiveScreenHeight(2),
    },
    dropdown:{},
    text:{
        position: 'relative',
    },
    autocompletesContainer: {
        paddingTop: 0,
        width: '100%',
        paddingHorizontal: 8,
      },
      plus: {
        position: 'absolute',
        left: 15,
        top: 10,
      },
      input: {maxHeight: responsiveScreenHeight(5)},
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c7c6c1',
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: '5%',
    width: '100%',
    justifyContent: 'flex-start',
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

saveIcon: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    position: 'absolute',
    right: responsiveWidth(2),
    bottom: responsiveHeight(1),
},
title: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'RubikBold',
    marginBottom: responsiveHeight(1),
},
data: {
    marginBottom: responsiveHeight(2),
},
});