import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
container: {
    flex: 1,   
    alignItems:'center',
    paddingTop:responsiveHeight(2),
    flexDirection: 'column',
  },
  menuButton: {

    marginLeft:'80%'
  },
  menuButtonText: {
    color: 'white',
    
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: responsiveFontSize(3),
  },
  perfil:{
    marginTop:'3%',
    padding:'15%',
    borderWidth:responsiveWidth(0.5),
    width:'10%',
    borderRadius:responsiveWidth(15),

},
containerNick:{
    margin:'3%',
    borderColor:'#FFc250',
    borderWidth:responsiveWidth(0.4),
    borderRadius:responsiveWidth(20),
},
nick:{
    padding:'2%',
    fontSize:responsiveFontSize(2),
},
seg:{
    padding:'2%',
},
box:{
    flexDirection:'row',
    
},
box1:{
    flexDirection:'row',
    justifyContent:'center',
    marginVertical:'4%',
},
drawer:{
    flex: 1,   
    paddingTop:responsiveHeight(2),
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column',
    marginLeft:'80%',
     
},
Logo:{
    width:responsiveFontSize(5),
    height:responsiveFontSize(5),
},
title:{
    fontSize:responsiveFontSize(4.5),
    marginTop:'5%',
    marginLeft:'5%',
    fontFamily:'Teacher',
},
viewTitle:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:'5%',
    
},
viewSubTitle:{
  flexDirection:'row',
  width:'100%',
  justifyContent:'flex-start',
  alignItems:'flex-start',
},
subTitle:{
  fontSize:responsiveFontSize(3.5),
  fontFamily:'Teacher',
  marginLeft:'15%',
  color:'#4A94CC',
},
campotext:{
    margin:'3%',
    fontSize:responsiveFontSize(1.8),
    fontFamily:'RubikNormal',
    marginRight:'7%',
    marginLeft:'15%',
},
campotext1:{
  margin:'3%',
  fontSize:responsiveFontSize(2.7),
  fontFamily:'Teacher',
  marginRight:'7%',
  marginLeft:'15%',
  color:'#000',
},
icon:{
    width:responsiveWidth(4),
    height:responsiveHeight(2),
    marginTop:'50%',
},
containerData:{
  margin:'3%',
  borderColor:'#FFc250',
  borderWidth:responsiveWidth(0.4),
  borderRadius:responsiveWidth(7),
  width:responsiveWidth(70),
  justifyContent:'center',
  
},
containerDataFeed:{
  margin:'3%',
  borderColor:'#FFc250',
  borderWidth:responsiveWidth(0.4),
  borderRadius:responsiveWidth(3.5),
  width:responsiveWidth(25),
  height:responsiveHeight(3),
  justifyContent:'center',
  alignItems:'center',
},
aliner:{
  flexDirection:'column',
  width:'65%',
  justifyContent:'center',
  alignItems:'flex-start',
  margin:'3%',
},
button:{
  backgroundColor:'#FFc250',
  borderRadius:responsiveWidth(7),
  width:responsiveWidth(40),
  justifyContent:'center',
  alignItems:'center',
  
},
textButton:{
  fontSize:responsiveFontSize(2.7),
  fontFamily:'Teacher',
  color:'#000',
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  margin: 20,
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
}
);