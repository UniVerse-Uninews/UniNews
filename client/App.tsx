import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import themes from './src/theme';
import { Login } from './src/screens/loginScreen';
import { Cadastro } from './src/screens/cadastro';
import { CrudUsuario } from './src/screens/crudUsuarioScreen';
import { PerfilUniversidade } from './src/screens/perfilUniversidade';
import { Pesquisar } from './src/screens/pesquisa';
import { Feed } from './src/screens/feed';
import { LerNoticia } from './src/screens/lerNoticia';
import { CrudUniversidade } from './src/screens/crudUniversidade';
import { Temas } from './src/screens/tema';
import { Perfil } from './src/screens/perfil';
import { FontLoader }  from './src/components/fontLoader/fontLoader';
import { AuthProvider } from './src/context/authContext';
import { RootStackParamList } from './src/@types/rootstack';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme as keyof typeof themes] || themes.light;

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <FontLoader>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Temas"
              component={Temas}
              options={{ headerShown: false }}
            />
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
            <Stack.Screen
              name="LerNoticia"
              component={LerNoticia}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CrudUniversidade"
              component={CrudUniversidade}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PerfilUniversidade"
              component={PerfilUniversidade}
              options={{ headerShown: false }}
            />
            { <Stack.Screen
              name="Pesquisar"
              component={Pesquisar}
              options={{ headerShown: false }}
            /> }
            { <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={{ headerShown: false }}
            />}
          </Stack.Navigator>
        </NavigationContainer>
       
      </FontLoader>
    </ThemeProvider>
    </AuthProvider>
  );
}
