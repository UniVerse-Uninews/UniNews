import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
drawer: {
    position: 'absolute',
    height: responsiveScreenHeight(100),
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container:
  {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: responsiveHeight(2),
    flex: 1,  },
    inputArea: {
      borderWidth: responsiveFontSize(0.2),
      borderRadius: responsiveScreenWidth(10),
      height: responsiveScreenHeight(5),
      paddingLeft: '5%',
      width: responsiveScreenWidth(55),
      borderColor: '#F2A20C',
      flexDirection: 'row',
      paddingBottom: '1%',
      backgroundColor: '#F5F5F5',
      marginVertical: '5%',
      marginLeft: '5%',
    },
    inputDropdown: {
      borderWidth: responsiveFontSize(0.2),
      maxHeight: responsiveScreenHeight(20),
      paddingLeft: '5%',
      width: responsiveScreenWidth(55),
      borderColor: '#F2A20C',
      paddingBottom: '1%',
      backgroundColor: '#F5F5F5',
      marginVertical: '5%',
      marginLeft: '5%',
    },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    color: 'blue',
  },
  containerInput: {
    flexDirection:'column',
    padding:10,
  },
  input:{
    color:'#000',
    marginRight:'5%'
  },
  titulo:{
    fontFamily:'RubikNormal',
    fontSize: responsiveHeight(3.5),
  },
  icon:{
    width:'5.5%',
    height:'100%'
  },
  campo:{
    flexDirection:'row'
  },
  img:{
    width:responsiveScreenWidth(5),
    height:responsiveScreenHeight(2),
    marginTop:responsiveScreenHeight(2)
  },
  textDrawer:{
    fontSize: responsiveFontSize(2),
    fontFamily: 'RubikNormal',
    marginLeft: '5%',
  },
});