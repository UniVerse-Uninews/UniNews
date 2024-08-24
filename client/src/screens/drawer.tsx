import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image, Button } from 'react-native';

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const dirImagem = require('../../assets/imagens/seta-direita.png');
const dirImagem1 = require('../../assets/imagens/ferramenta-lapis.png');

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  const drawerTranslateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.85;
  const textInputRef = useRef<TextInput>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('Ryandro');

  useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isOpen ? screenWidth - drawerWidth : screenWidth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isOpen, drawerWidth, screenWidth]);

  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditing]);

  const handleButtonPress = () => {
    setIsEditing(true); // Start editing mode when button is pressed
  };

  const handleTextInputBlur = () => {
    setIsEditing(false); // End editing mode when TextInput loses focus
  };

  return (
    <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX: drawerTranslateX }] }]}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image style={styles.seta} source={dirImagem} />
      </TouchableOpacity>

      <View style={styles.containerInput}>
        <Text style={styles.titulo}>Dados Pessoais</Text>
      </View>

      <View style={styles.grupo}>
      
      <Text>Nome:</Text>
      
      <View style={styles.campo}>
        {isEditing ? (
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="Nome do usuário"
            placeholderTextColor="#8F8F8F"
            value={textValue}
            onChangeText={setTextValue}
            onBlur={handleTextInputBlur}
            returnKeyType="done"
          />
        ) : (
          <Text style={styles.valueText}>{textValue}</Text>
        )
        }
        
      
      </View>
      <View style={styles.campo1}>  
          <TouchableOpacity onPress={handleButtonPress}>
            <Image style={styles.imagem} source={dirImagem1}/>
          </TouchableOpacity>
        </View>
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
    zIndex: 1000,
  },
  button: {
    fontSize: 16,
    color: 'blue',
  },
  containerInput: {
    flexDirection: 'column',
    padding: 10,
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    color: '#000',
    marginRight: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  titulo: {
    color: '#0571D3',
    fontSize: 17,
  },
  seta: {
    width: '7%',
    height: '20%',
  },
  valueText: {
    fontSize: 14,
    color: '#000',
    paddingHorizontal:'4%'
  },
  campo:{
    justifyContent:'center',
    alignContent:'center'
  },
  grupo:{
    flexDirection:'row', 
    alignItems:'center'
  },
  campo1:{
    
  },
  imagem:{
    width:15,
    height:15
  }
  
});

export default Drawer;
