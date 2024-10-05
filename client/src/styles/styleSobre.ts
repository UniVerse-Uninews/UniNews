
import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'Teachers Students',
    
      
    },
    sobre:{
        alignContent:'center',
        justifyContent:'center',
        paddingTop:'6%',
        paddingLeft:'6%',
        fontSize:40,
        fontFamily: 'Teacher',
    },
    perfil:{
        flex:1,
        flexDirection:'row',
        textAlign:'center',
        alignItems:'center',
        marginBottom:'7%',
        borderWidth:2,
        margin:'4%',
        padding:'3%',
        paddingLeft:'5%',
        borderRadius:12,
        borderColor:'#0571D3',
       
        
    },
    foto:{
        borderWidth:1,
        height:80,
        width:80,
        borderRadius:50,
        marginRight:'5%',
        marginLeft:'4%',
        alignItems:'center',

    },
    foto1:{
        //backgroundColor:'blue',
        height:'100%',
        width:'30%',

 

    },
    subtitulo1:{
       flex:1,
       textAlign:'justify',

    },
    subtitulo:{
        textAlign:'center',
        padding:'10%'
    },
    titulo:{
        flexDirection:'row',
        alignItems:'center',
        padding:10, 
    },
    titulo1:{
        alignContent:'center',
        justifyContent:'center',
        paddingTop:'6%',
        paddingBottom:'1%',
        paddingLeft:'11%',
        fontSize:40,
        fontFamily: 'Teacher',
    },
    Logo:{
        width:150,
        height:125
    },
    texto:{
        width:'70%',
        //backgroundColor:'red',
        alignItems:'center'
       
    },
    fotinha:{
        width:'100%',
        height:'100%',
        resizeMode: 'cover',
        borderRadius:50,
        
    },
    textos:{
        flexDirection:'column',
        width:'55%',  
    },

    texto1:{
        fontSize:15,
        
    }
   

   
     
     
    
  });
  
