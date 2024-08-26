import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    height: '32%',
    width: '100%',
  },
  cabecalho: {
    marginTop: '10%',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  img: {
    width: '50%',
    height: '60%',
    marginLeft: '5%',
  },
  img1: {
    width: '90%',
    height: '100%',

  },
  containerTitleLogo: {
    flexDirection: 'row',

  },
  nameLogo: {
    marginLeft: '3%',
    fontSize: responsiveFontSize(10),
    fontFamily: 'Teacher',
    color: '#4A94CC',
  },
  nameLogoSecondary: {
    fontSize: responsiveFontSize(10),
    fontFamily: 'Teacher',

  }
});
