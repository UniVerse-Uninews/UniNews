import { StyleSheet } from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    borderWidth: responsiveScreenHeight(0.2),
    width: '80%',
    height: '60%',
    borderRadius: responsiveScreenHeight(2),
    borderColor: '#4A94CC',
    position: 'relative',
    alignItems: 'center',
    paddingTop: '7%',
  },
  input: {
    height: responsiveScreenHeight(4.5),
    margin: responsiveScreenHeight(1),
    borderWidth:responsiveScreenHeight(0.2),
    padding: responsiveScreenHeight(1),
    borderRadius: responsiveScreenHeight(2),
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
  },
  textbutton2: {
    fontSize: responsiveScreenFontSize(2),
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
    marginVertical: '20%',
  },
  Uni: {
    fontSize: responsiveScreenFontSize(10),
    color: '#4A94CC',
    fontFamily: 'Teacher'
  },
  News: {
    fontSize: responsiveScreenFontSize(10),
    fontFamily: 'Teacher'
  },

  errorText: {
    color: 'red',
    fontSize: responsiveScreenFontSize(2),
    marginTop: responsiveScreenHeight(1),
  },
});
