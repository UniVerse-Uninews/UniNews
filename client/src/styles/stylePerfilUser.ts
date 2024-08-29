import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
container: {
    flex: 1,   
    alignItems:'center',
    paddingTop:10,
    flexDirection: 'column',
  },
  menuButton: {

    marginLeft:'80%'
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
  },
  perfil:{
    marginTop:'3%',
    padding:'15%',
    borderWidth:2,
    width:'10%',
    borderRadius:90,

},
containerNick:{
    margin:'3%',
    borderColor:'#F2A20C',
    borderWidth:1,
    borderRadius:20,
    backgroundColor:'#fff',
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
drawer:{
    flex: 1,   
    paddingTop:10,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column',
    marginLeft:'80%',
     
},
Logo:{
    width:30,
    height:30
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
icon:{
    width:responsiveWidth(4),
    height:responsiveHeight(2),
    marginTop:'50%',
},
containerData:{
  margin:'3%',
  borderColor:'#F2A20C',
  borderWidth:1,
  borderRadius:20,
  backgroundColor:'#fff',
  width:responsiveWidth(70),
  justifyContent:'center',
 
},
containerDataFeed:{
  margin:'3%',
  borderColor:'#F2A20C',
  borderWidth:1,
  borderRadius:10,
  backgroundColor:'#fff',
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
}
);