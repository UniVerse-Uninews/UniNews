import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, TouchableOpacity, Dimensions, Image, ActivityIndicator, Text } from 'react-native';
import { ContainerDrawer, Name } from '../theme/style';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '@styles/styleDrawer';
import { useLocations } from '../hooks/useUniversityLocation';

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  onSearch: (searchTerm: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer, onSearch }) => {
  const drawerTranslateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.70;
  const dirSeta = require('../../assets/imagens/Arrow.png');

  const [selectedState, setSelectedState] = useState<string>('');
  const { states, universities, loading, error, fetchUniversities } = useLocations();

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    if (state) {
      fetchUniversities(state); 
    }
  };
  
  const handleUniversitySelect = (universityKey: string) => {
    const selectedUniversity = universities.find(university => university.key === universityKey);
    if (selectedUniversity) {
        onSearch(selectedUniversity.value);
        
    }
  };

  useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isOpen ? screenWidth - drawerWidth : screenWidth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isOpen, drawerWidth, screenWidth]);

  return (
    <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX: drawerTranslateX }] }]}>
      <ContainerDrawer style={styles.container}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Image source={dirSeta} style={styles.img} />
        </TouchableOpacity>

        <View style={styles.containerInput}>
          <Name style={styles.titulo}>Estado</Name>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <SelectList
              setSelected={handleStateSelect}
              data={states.map(state => ({
                key: state.key,
                value: String(state.value),
              }))}
              searchPlaceholder='Pesquisar'
              placeholder='Selecione um estado'
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{ color: '#000' }}
            />
          )}

          <Name style={styles.titulo}>Universidade</Name>
          {universities.length > 0 ? (
            <SelectList
              setSelected={handleUniversitySelect}
              data={universities.map(university => ({
                key: university.key,
                value: university.value,
              }))}
              searchPlaceholder='Pesquisar'
              placeholder='Selecione uma universidade'
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{ color: '#000' }}
              onSelect={toggleDrawer}
            />
          ) : (
            <Name style={styles.textDrawer}>Selecione um estado para ver as universidades.</Name>
          )}
        </View>
      </ContainerDrawer>
    </Animated.View>
  );
};

export default Drawer;
