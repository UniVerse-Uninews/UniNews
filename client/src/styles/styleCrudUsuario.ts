import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDados: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '2%',
  },
  viewDados: {
    width: '55%',
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
  titulo: {
    fontSize: responsiveFontSize(5),
    margin: '4%',
    fontFamily: 'Teacher',
  },
  containerInput: {
    borderWidth: responsiveWidth(0.4),
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(1.5),
    paddingBottom: '10%',
    borderColor: '#F3C63B',
  },
  input: {
    borderWidth: responsiveWidth(0.5),
    borderRadius: responsiveWidth(1),
    height: responsiveHeight(3),
    fontFamily: 'Rubik',
    paddingLeft: responsiveWidth(1),
    marginTop: '10%',
    width: responsiveWidth(45),
    marginLeft: responsiveWidth(3),
    color: '#000',
  },
  containerButton: {
    marginLeft: responsiveWidth(3),
  },

  radio: {
    flexDirection: 'row',
    paddingTop: '5%',
    marginLeft: responsiveWidth(3),
  },
  textRadio: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'RubikNormal',
    paddingTop: '5%',
  },
  containerTable: {
    width: '100%',
    height: '50%',
    marginTop: '5%',
    marginLeft: '4%',
  },
  table: {
    width: '90%',
    height: '100%',
    borderWidth: responsiveWidth(0.4),
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingTop: '10%',
    marginLeft: '4%',
  },
  checkbox: {
    flexDirection: 'row',
    paddingTop: '5%',
    marginLeft: responsiveWidth(3),
  },
  textCheckbox: {
    fontSize: responsiveWidth(3.3),
    fontFamily: 'RubikNormal',
    marginLeft: '4%',
  },
});
