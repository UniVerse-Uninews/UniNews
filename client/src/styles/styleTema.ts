import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent:'center',
      alignItems:'center',
      textAlign:'center',
     
      
    },
    modo:{
      width:'100%',  
      height:'100%',
      alignContent:'center',
      alignItems:'center',
      textAlign:'center',
  
      
      
    },
    titulo:{
      paddingTop:'7%',
      paddingBottom:'7%',
      flexDirection:'row',
      
    },
    subtitulo:{
      width:'50%',
      borderWidth:2,
      borderColor:'#F2A20C',
      borderRadius:10,
      paddingBottom:'4%',
      paddingTop:'2%',
      paddingHorizontal:'3%',
     
    },
    textosub:{
        textAlign:'justify'
    },
    textosub2:{
        textAlign:'center'
    },
    tema:{
      color:'#0571D3',
      opacity:1
    },
    titulo1:{
      right:'30%',
      padding:'7%',
      fontSize:20,
    },
    nameLogo: {
      marginLeft: '3%',
      fontSize: responsiveFontSize(6),
      fontFamily: 'Teachers Students',
      color: '#4A94CC',
    },
    nameLogoSecondary: {
      fontSize: responsiveFontSize(6),
      fontFamily: 'Teachers Students',
    },
    box:{
      flexDirection:'row',
      justifyContent:'center',
      borderRadius:13
      
    },
    subbox:{
  
      padding:'3%',
      margin:'5%',
      justifyContent:'center',
      textAlign:'center',
      alignContent:'center',
      verticalAlign:'middle',
      height:90,
      width:120,
      borderRadius:13,
     
     
     
    }
  });
  
