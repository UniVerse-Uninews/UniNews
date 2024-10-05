import React, { useState, useRef } from 'react';
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

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const { countries, states, universities, loading, error, fetchStates, fetchUniversities } = useLocations();

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    fetchStates(country);
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    if (state) {
      fetchUniversities(state); 
    }
  };
  
  const handleUniversitySelect = (universityKey: string) => {
    console.log('Chave da universidade selecionada:', universityKey);
    const selectedUniversity = universities.find(university => university.key === universityKey);
    if (selectedUniversity) {
        console.log('Universidade selecionada:', selectedUniversity);
        onSearch(selectedUniversity.value);
    } else {
        console.error('Universidade não encontrada:', universityKey);
    }
};



  React.useEffect(() => {
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
          <Name style={styles.titulo}>País</Name>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <SelectList
              setSelected={(val: any) => handleCountrySelect(val)}
              data={countries.map(country => ({
                key: country.key,
                value: String(country.value),
              }))}
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{ color: '#000' }}
            />
          )}

          <Name style={styles.titulo}>Estado</Name>
          {states.length > 0 ? (
            <SelectList
              setSelected={(val: any) => handleStateSelect(val)}
              data={states.map(state => ({
                key: state.key,
                value: String(state.value),
              }))}
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{ color: '#000' }}
            />
          ) : (
            <Text>Selecione um país para ver os estados.</Text>
          )}

          <Name style={styles.titulo}>Universidade</Name>
          {universities.length > 0 ? (
            <SelectList
            setSelected={(val: any) => handleUniversitySelect(val)}
            data={universities.map(university => ({
                key: university.key,
                value: university.value,
            }))}
            save="value"
            boxStyles={styles.inputArea}
            dropdownStyles={styles.inputDropdown}
            dropdownTextStyles={{ color: '#000' }}
        />
          ) : (
            <Text>Selecione um estado para ver as universidades.</Text>
          )}
        </View>
      </ContainerDrawer>
    </Animated.View>
  );
};

export default Drawer;
