import {CrudUsuario} from './src/screens/crudUsuarioScreen';
import { useColorScheme } from 'react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import themes from './src/theme';
import Button from './src/components/addButton/Button';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = themes[colorScheme as keyof typeof themes] || themes.light;
  return (
    <ThemeProvider theme={theme}>
        <CrudUsuario/>
    </ThemeProvider>
  );
}