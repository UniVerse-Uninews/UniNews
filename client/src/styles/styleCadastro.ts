import { StyleSheet } from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveScreenFontSize(2.5),
    fontFamily: 'RubikMedium',
    textAlign: 'left',
    position: 'absolute',
    marginLeft: '5%',
    marginTop: '3%',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: 'RubikNormal',
    textAlign: 'left',
    marginLeft: '13%',
    marginTop: '5%',
  },
  containerInput: {
    width: '100%',
    height: responsiveScreenHeight(4.5),
    alignItems: 'center',
    
  },
  containerInputCadastro: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    marginTop: '8%',
  },
  input: {
    height: '100%',
    fontFamily: 'RubikMedium',
    width: '80%',
    borderColor: '#F2A20C',
    color: '#000',
  },
  inputArea: {
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(10),
    height: '70%',
    paddingLeft: '5%',
    marginTop: '3%',
    width: '65%',
    borderColor: '#F2A20C',
    flexDirection: 'row',
    paddingBottom: '1%',
  },
  containerDados: {
    width: '70%',
    borderWidth: responsiveWidth(1),
    borderRadius: responsiveWidth(6),
    borderColor: '#4A94CC',
  },
  containerCadastro: {
    width: '100%',
    backgroundColor: '#4A94CC',
    borderTopLeftRadius: responsiveScreenHeight(2),
    borderTopRightRadius: responsiveScreenHeight(2),
    height: '10%',
  },
  containerIcon: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '3%',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(1.5),
    marginTop: responsiveScreenHeight(1),
  },
  containerLogin: {
    flexDirection: 'row',
    marginTop: '5%',
    width: '100%',
    justifyContent: 'center',
  },
  login: {
    color: '#4169E1',
  },
});
