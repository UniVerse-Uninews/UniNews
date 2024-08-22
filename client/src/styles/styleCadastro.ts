import { StyleSheet } from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveScreenFontSize(3),
    fontFamily: 'Teacher',
    textAlign: 'left',
    position: 'absolute',
    marginLeft: '5%',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: 'Rubik',
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
    fontFamily: 'Rubik',
    width: '80%',
    borderColor: '#F2A20C',
    color: '#000',
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 15,
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
    borderWidth: 5,
    borderRadius: 25,
    borderColor: '#4A94CC',
  },
  containerCadastro: {
    width: '100%',
    backgroundColor: '#4A94CC',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
    fontSize: 12,
    marginTop: 5,
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
