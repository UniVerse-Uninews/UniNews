import  React, {useState, useRef} from 'react';
import { Animated, View, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import {
  ContainerDrawer,
  Name,
} from '../theme/style';
import { SelectList } from 'react-native-dropdown-select-list'
import { styles  } from '@styles/styleDrawer';




// Define the props interface for the Drawer component
interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}


const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  const drawerTranslateX = React.useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const screenWidth = Dimensions.get('window').width;
  const textInputRef = useRef<TextInput>(null);
  
  const dirSeta= require('../../assets/imagens/Arrow.png'); 

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
        <Image source={dirSeta} style={styles.img}/>
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

export default Drawer;