import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';


export const styles = StyleSheet.create({
    container: {
      flex: 1,   
      paddingTop:responsiveHeight(2),
      alignItems:'center',
      justifyContent:'center',
      flexDirection: 'column',
  
    },
    navigationContainer: {
      backgroundColor: '#ecf0f1',
      
    },
    perfil:{
      marginTop:'3%',
      padding:'15%',
      borderWidth:responsiveScreenWidth(0.6),
      width:'10%',
      borderRadius:responsiveScreenWidth(10),
  
  },
  nick:{
      padding:'3%',
      fontSize:18,
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
  }
   
  });
  
