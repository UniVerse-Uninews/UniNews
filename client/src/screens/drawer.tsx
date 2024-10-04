import React, { useState, useRef } from 'react';
import { Animated, View, TouchableOpacity, Dimensions,  Image, ActivityIndicator, Text } from 'react-native';
import { ContainerDrawer, Name } from '../theme/style';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '@styles/styleDrawer';
import { useLocations } from '../hooks/useUniversityLocation'

// Define the props interface for the Drawer component
interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
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
    fetchUniversities(state); 
  };

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
            <Image source={dirSeta} style={styles.img} />
          </TouchableOpacity>

          <View style={styles.containerInput}>
            <Name style={styles.titulo}>País</Name>

            {/* Exibir loading ou erro */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <SelectList
              setSelected={(val: any) => handleCountrySelect(val)}
              data={countries.map(country => ({
                key: country.key,
                value: country.value, // Exibindo apenas o valor
              }))}
              save="value"
              boxStyles={styles.inputArea}
              dropdownStyles={styles.inputDropdown}
              dropdownTextStyles={{ color: '#000' }}
            />
            )}

            <Name style={styles.titulo}>Estado</Name>
                  <SelectList
        setSelected={(val: any) => handleStateSelect(val)}
        data={states.map(state => ({
          key: state.key,
          value: state.value, // Exibindo apenas o valor
        }))}
        save="value"
        boxStyles={styles.inputArea}
        dropdownStyles={styles.inputDropdown}
        dropdownTextStyles={{ color: '#000' }}
      />


            <Name style={styles.titulo}>Universidade</Name>
                  <SelectList
        setSelected={(val: any) => {}}
        data={universities.map(university => ({
          key: university.id, // Use um campo único, como o id
          value: university.name // Exiba o nome ou outra propriedade textual
        }))}
        save="value"
        boxStyles={styles.inputArea}
        dropdownStyles={styles.inputDropdown}
        dropdownTextStyles={{ color: '#000' }}
      />

          </View>
        </ContainerDrawer>
      </Animated.View>
    </>
  );
};

export default Drawer;
