import  React, {useState, useRef} from 'react';

import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import {
  Container,
  ScrollContainer,
  NameBlue,
  Name,
  BackgroundInputText,
  BorderColorTable,
  BackgroundContainerInput,
} from '../theme/style';

const Icon= require('../../assets/imagens/icon_editar_vazio.png');

// Define the props interface for the Drawer component
interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}


const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  // Create a ref for the Animated value
  const drawerTranslateX = React.useRef(new Animated.Value(Dimensions.get('window').width)).current;

  // Get the width of the screen
  const screenWidth = Dimensions.get('window').width;
  const textInputRef = useRef<TextInput>(null);


  // Define drawer width as a fraction of the screen width (e.g., 70% of the screen width)
  const drawerWidth = screenWidth * 0.85;

  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('Ryandro');
  
  React.useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isOpen ? screenWidth - drawerWidth : screenWidth, // Adjust based on screen width
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isOpen, drawerWidth, screenWidth]);
  

  return (
   
    <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX: drawerTranslateX }] }]}>
      
      <TouchableOpacity onPress={toggleDrawer}>
        <Text style={styles.button}>Close Drawer</Text>
      </TouchableOpacity>


      <View style={styles.containerInput}>
        <Text style={styles.titulo}>Dados Pessoais</Text>
      </View>



      <View style={styles.containerInput}>
        <Text>Nome de usuário</Text>
        {isEditing ? (
          <TextInput
            ref={textInputRef} 
            style={styles.input}
            placeholder="Nome do usuário"
            placeholderTextColor={'#8F8F8F'}
            value={textValue}
            onChangeText={setTextValue}
            onBlur={() => setIsEditing(false)} // Switch back to button mode on blur
          />
        ) : (
          <TouchableOpacity style={styles.campo}  onPress={() => setIsEditing(true)}>
            <Text style={styles.input}>{textValue || ''}</Text>
            <Image
                  source={Icon}
                  style={styles.icon} 
                  
                />
          
          </TouchableOpacity>
        )}
      </View>
      
      
     
     
    </Animated.View>
   
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    zIndex:1000
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
    color:'#0571D3',
    fontSize:17
  },
  icon:{
    width:'7%',
    height:'100%'
  },
  campo:{
    flexDirection:'row'
  }
  
});

export default Drawer;