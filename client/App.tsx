import { Cadastro } from './src/screens/cadastro';
import { CrudUsuario } from './src/screens/crudUsuarioScreen';
import { useColorScheme } from 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from './src/theme';
import Login from './src/screens/loginScreen';



export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme as keyof typeof themes] || themes.light;

  return (
    <ThemeProvider theme={theme}>
        <Login/>
    </ThemeProvider>
  );
}