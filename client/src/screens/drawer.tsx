// Drawer.js
import React from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const Drawer = ({ isOpen, toggleDrawer }: any) => {
  const drawerTranslateX = React.useRef(new Animated.Value(-300)).current; // Drawer hidden off-screen

  React.useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.drawerContent}>
        <Text style={styles.drawerText}>Drawer Content</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  closeButton: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerText: {
    fontSize: 24,
  },
});

export default Drawer;