import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

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
    marginHorizontal: 8,
    marginTop: 10
  },
  titulo: {
    fontSize: 30,
    margin: '4%',
    fontFamily: 'Teachers Students',
  },
  imageContainer: {
    width: 50,
    padding: '1%'
  },
  containerInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingBottom: '10%',
    borderColor: '#F3C63B',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 5,
    height: responsiveHeight(3),
    fontFamily: 'Rubik_400Regular',
    paddingLeft: 5,
    marginTop: '10%',
    width: responsiveWidth(45),
    marginLeft: responsiveWidth(3),
  },
  containerButton: {
    marginLeft: responsiveWidth(3),
  },
  campos: {
    fontFamily: 'Rubik_400Regular',
  },
  radio: {
    flexDirection: 'row',
    paddingTop: '5%',
    marginLeft: responsiveWidth(3),

  },
  textRadio: {
    fontSize: 15,
    fontFamily: 'Rubik_400Regular',
    paddingTop: '5%',
  },
  containerTable: {
    width: '100%',
    height: '50%',
    marginTop: '5%',
    marginLeft: '4%'
  },
  table: {
    width: '90%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 10
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
    fontSize: 15,
    fontFamily: 'Rubik_400Regular',
    marginLeft: '4%',
  },
});