import { StyleSheet } from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
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
  input: {
    height: '100%',
    fontFamily: 'RubikNormal',
    width: '80%',
    marginTop: '1.75%',
    borderColor: '#F2A20C',
    color: '#000',
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 15,
    height: '75%',
    paddingLeft: '5%',
    marginTop: '3%',
    width: '65%',
    borderColor: '#F2A20C',
    flexDirection: 'row',
    paddingBottom: '1%',
  },
  inputSpecial: {
    borderWidth: 1.5,
    borderRadius: 5,
    color: '#000',
    height: responsiveScreenHeight(3),
    fontFamily: 'RubikNormal',
    paddingLeft: 5,
    marginTop: '10%',
    width: responsiveWidth(45),
    marginLeft: responsiveWidth(3),
  },
});
