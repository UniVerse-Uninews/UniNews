import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
// import Icon from '../../assets/imagens/editar.png';

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

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

  const handleImagePress = () => {
    setIsEditing(true);
  };

  const handleTextInputBlur = () => {
    setIsEditing(false); 
  };

  const handleTextInputPress = (e: React.SyntheticEvent) => {
    if (!isEditing) {
      e.stopPropagation();
    }
  };

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
            placeholderTextColor="#8F8F8F"
            value={textValue}
            onChangeText={setTextValue}
            onBlur={handleTextInputBlur}
             
          />
        ) : (
          <TouchableOpacity style={styles.campo} onPress={handleImagePress}>
            <Text style={styles.input}>{textValue || ''}</Text>
            {/* <Image source={} style={styles.icon} /> */}
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
  input: {
    color: '#000',
    marginRight: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 5,
  },
  titulo: {
    color: '#0571D3',
    fontSize: 17,
  },
  icon: {
    width: 24,
    height: 24,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Drawer;
