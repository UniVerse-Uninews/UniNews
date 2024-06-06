// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cadastro } from './src/screens/cadastro';
import { CrudUsuario } from './src/screens/crudUsuarioScreen';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import themes from './src/theme';
import Login from './src/screens/loginScreen';
import {Feed} from './src/screens/feed';


const Stack = createStackNavigator();

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme as keyof typeof themes] || themes.light;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CrudUsuario"
            component={CrudUsuario}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
