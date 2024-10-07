import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '5%',
    
  },
  icon1:{
      width:responsiveWidth(5),
      height:responsiveHeight(2),
      justifyContent:'flex-start',
  },
  box: {
    borderWidth: responsiveScreenHeight(0.2),
    width: '80%',
    height: 'auto',
    borderRadius: responsiveScreenHeight(2),
    borderColor: '#4A94CC',
    position: 'relative',
    alignItems: 'center',
    paddingTop: '5%',
  },
  input: {
    height: responsiveScreenHeight(4.5),
    margin: responsiveScreenHeight(1),
    borderWidth:responsiveScreenHeight(0.1),
    padding: responsiveScreenHeight(1),
    borderRadius: responsiveScreenHeight(2),
    borderColor: '#3C6294',
    flexDirection: 'row',
    width: '95%',

  },
inputSenha: {
    height: '100%',
    fontFamily: 'RubikNormal',
    width: '85%',
    marginTop: '1.5%',
    borderColor: '#F2A20C',
    color: '#000',
    marginLeft: responsiveScreenHeight(1),
  },
  campo: {
    width: '90%',
    marginBottom: responsiveScreenHeight(2),
  },
  campotext: {
    marginLeft: responsiveScreenHeight(2),
  },
  button: {
    borderWidth: responsiveScreenHeight(0.1),
    borderColor: '#4A94CC',
    height: responsiveScreenHeight(5),
    borderRadius: responsiveScreenHeight(2.5),
    backgroundColor: '#4A94CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    marginHorizontal: '1%',
  },
  textbutton: {
    color: '#fff',
    fontSize: responsiveScreenFontSize(2),
  },
  button2: {
    borderWidth: responsiveScreenHeight(0.2),
    height: responsiveScreenHeight(5),
    borderRadius: responsiveScreenHeight(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    marginHorizontal: '1%',
    marginBottom:'4%'
  },
  textbutton2: {
    fontSize: responsiveScreenFontSize(2),
    
  },
  containerIcon: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '32%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  
  boxbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    padding: '3%',
  },
  logo: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: '20%',
  },
  Uni: {
    fontSize: responsiveScreenFontSize(12),
    color: '#4A94CC',
    fontFamily: 'Teacher'
  },
  News: {
    fontSize: responsiveScreenFontSize(12),
    fontFamily: 'Teacher'
  },

  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(2),
  

  },
  subtitle: {
    position: 'relative',
    marginBottom: '12%',
  },
  subtitletext: {
    fontSize: responsiveScreenFontSize(3.5),
    color: '#F2A20C',
    fontFamily: 'Teacher'
  },
  senha:{
    color:'#4A94CC',
    padding:'5%'
  }
});
