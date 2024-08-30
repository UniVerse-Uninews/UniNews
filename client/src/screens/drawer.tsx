import { Container, Name, NameBlue } from '@theme/style';
import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image, } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { DrawerProps } from 'src/@types/interfaces';


const dirImagem = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_logout.png';
const dirImagem1 = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_lapis_editar.png';

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
    setIsEditing(true); 
  };

  const handleTextInputBlur = () => {
    setIsEditing(false); 
  };

  return (

    <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX: drawerTranslateX }] }]}>
      <Container style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image style={styles.seta} source={{uri: dirImagem}} />
      </TouchableOpacity>

      <View style={styles.containerInput}>
        <NameBlue style={styles.titulo}>Dados Pessoais</NameBlue>
      </View>

      <View style={styles.grupo}>
      
      <Name style={styles.label}>Nome:</Name>
      
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
          <Name style={styles.valueText}>{textValue}</Name>
        )
        }
        
        
      
      </View>
      
      <View style={styles.campo1}>  
          <TouchableOpacity onPress={handleButtonPress}>
            <Image style={styles.imagem} source={{uri: dirImagem1}}/>
          </TouchableOpacity>
        </View>
      </View>


      
      <View style={styles.grupo}>
      
      <Name style={styles.label}>E-mail:</Name>
      
      <View style={styles.campo}>
        {isEditing ? (
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="E-mail do usuário"
            placeholderTextColor="#8F8F8F"
            value={textValue}
            onChangeText={setTextValue}
            onBlur={handleTextInputBlur}
            returnKeyType="done"
          />
        ) : (
          <Name style={styles.valueText}>{textValue}</Name>
        )
        }
        
        
      
      </View>
      
      <View style={styles.campo1}>  
          <TouchableOpacity onPress={handleButtonPress}>
            <Image style={styles.imagem} source={{uri: dirImagem1}}/>
          </TouchableOpacity>
        </View>
      </View>
      </Container>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveFontSize(2),
    paddingLeft: responsiveFontSize(2),
  },
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
    fontFamily: 'Teacher',
    fontSize: responsiveFontSize(4),
  },
  seta: {
    width: '7%',
    height: '20%',
    resizeMode: 'contain',
  },
  valueText: {
    fontSize: 14,
    color: '#3c6294',
    paddingHorizontal:'4%'
  },
  campo:{
    justifyContent:'center',
    alignContent:'center'
  },
  grupo:{
    flexDirection:'row', 
    alignItems:'center',
    marginLeft:'6%',
  },
  campo1:{
    
  },
  imagem:{
    width:15,
    height:15
  },
  label:
  {
    fontSize: responsiveFontSize(2),
    fontFamily: 'RubikNormal',
  }
});

export default Drawer;
