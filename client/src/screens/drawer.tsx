import  React, {useState, useRef} from 'react';

import { Animated, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image, StatusBar, SafeAreaView } from 'react-native';
import {
  ContainerDrawer,
  ScrollContainer,
  NameBlue,
  Name,
  BackgroundInputText,
  BorderColorTable,
  BackgroundContainerInput,
  BackgroundInput,
} from '../theme/style';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { SelectList } from 'react-native-dropdown-select-list'




// Define the props interface for the Drawer component
interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}


const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  const drawerTranslateX = React.useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const screenWidth = Dimensions.get('window').width;
  const textInputRef = useRef<TextInput>(null);
  
  const dirSeta= 'http://projetoscti.com.br/projetoscti27/uninews/img/Arrow.png'; 

  const Icon= require('../../assets/imagens/icon_editar_vazio.png');

  const [selected, setSelected] = React.useState('');
    
    const data = [
        {key:'1', value:'TAIWAIN', disabled:true},
        {key:'2', value:'CHINA'},
        {key:'3', value:'EUA'},
        {key:'4', value:'RUSSIA', disabled:true},
        {key:'5', value:'BRASSIL'},
        {key:'6', value:'UCRAINA'},
        {key:'7', value:'JAPAO'},
    ]

  const drawerWidth = screenWidth * 0.70;

  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('Ryandro');
  
  React.useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isOpen ? screenWidth - drawerWidth : screenWidth, 
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isOpen, drawerWidth, screenWidth]);
  

  return (
   <>
    <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX: drawerTranslateX }] }]}>
      
      <ContainerDrawer style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={{uri:dirSeta}} style={styles.img}/>
      </TouchableOpacity>



      <View style={styles.containerInput}>
      <Name style={styles.titulo}>País</Name>
          <SelectList 
              setSelected={(val: any) => setSelected(val)} 
              data={data} 
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{color: '#000'}}
          />
        <Name style={styles.titulo}>Estado</Name>
          <SelectList 
              setSelected={(val: any) => setSelected(val)} 
              data={data} 
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{color: '#000'}}
          />
        <Name style={styles.titulo}>Universidade</Name>
          <SelectList 
              setSelected={(val: any) => setSelected(val)} 
              data={data} 
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{color: '#000'}}
          />


      {/*{isEditing ? (
          <TextInput
            ref={textInputRef} 
            style={styles.input}
            placeholder="Nome do usuário"
            placeholderTextColor={'#8F8F8F'}
            value={textValue}
            onChangeText={setTextValue}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <TouchableOpacity style={styles.campo}  onPress={() => setIsEditing(true)}>
            <Name style={styles.input}>{textValue || ''}</Name>
            <Image
                  source={Icon}
                  style={styles.icon} 
                  
                />
          
          </TouchableOpacity>
        )}*/}
      </View>
      
      
      </ContainerDrawer>
     
    </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    height: responsiveScreenHeight(100),
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container:
  {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: responsiveHeight(2),
    flex: 1,  },
    inputArea: {
      borderWidth: responsiveFontSize(0.2),
      borderRadius: responsiveScreenWidth(10),
      height: responsiveScreenHeight(4.5),
      paddingLeft: '5%',
      width: responsiveScreenWidth(55),
      borderColor: '#F2A20C',
      flexDirection: 'row',
      paddingBottom: '1%',
      backgroundColor: '#F5F5F5',
      marginVertical: '5%',
      marginLeft: '5%',
    },
    inputDropdown: {
      borderWidth: responsiveFontSize(0.2),
      maxHeight: responsiveScreenHeight(20),
      paddingLeft: '5%',
      width: responsiveScreenWidth(55),
      borderColor: '#F2A20C',
      paddingBottom: '1%',
      backgroundColor: '#F5F5F5',
      marginVertical: '5%',
      marginLeft: '5%',
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
    fontFamily:'RubikNormal',
    fontSize: responsiveHeight(3.5),
  },
  icon:{
    width:'5.5%',
    height:'100%'
  },
  campo:{
    flexDirection:'row'
  },
  img:{
    width:responsiveScreenWidth(5),
    height:responsiveScreenHeight(2),
    marginTop:responsiveScreenHeight(2)
  },
  
});

export default Drawer;