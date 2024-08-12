// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Drawer from './drawer';

const Teste = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Open Drawer</Text>
      </TouchableOpacity>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>Main Content Area</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    padding: 16,
    backgroundColor: 'blue',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
  },
});

export default Teste;
