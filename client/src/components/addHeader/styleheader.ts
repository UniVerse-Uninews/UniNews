import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    
  },
  container2: {
  
    backgroundColor:'#000'
  },
  cabecalho: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '2.5%',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
  line: {
    borderWidth: 1.3,
    marginTop: '1%',
    width: '100%',
  },
  nameLogo: {
    marginLeft: '1.5%',
    fontSize: responsiveFontSize(4.5),
    fontFamily: 'Teacher',
  },
  nameLogoSecondary: {
    fontSize: responsiveFontSize(4.5),
    fontFamily: 'Teacher',
  },
});
