// src/screens/loginScreen.tsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { loginUser } from '../services/api';
import { styles } from '../styles/styleLogin';
import { BackgroundContainerInput, BackgroundInput, BorderColorButton, Container, Name } from '@theme/style';
import { useAuth } from '../context/authContext';

export  function Login({ navigation }: any) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const { token, role, id } = await loginUser(username, password);
      console.log('Login successful:', { token, role, id });

      login({ token, role, id });

      if (role === 'ADMIN') {
        navigation.navigate('Feed');
      } else {
        navigation.navigate('Feed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erro de autenticação',
        'Erro ao fazer login. Verifique suas credenciais.',
        [{ text: 'OK' }]);
      setLoginError('Erro ao fazer login. Verifique suas credenciais.'
      );
    }
  };
  

  return (
    <Container style={styles.container}>
      <View style={styles.logo}>
        <Name style={styles.Uni}>UNI</Name>
        <Name style={styles.News}>NEWS</Name>
      </View>
      <View style={styles.subtitle}>
        <Name style={styles.subtitletext}>SUA JANELA PARA O MUNDO ACADÊMICO</Name>
      </View>

      <BackgroundContainerInput style={styles.box}>
        <View style={styles.campo}>
          <Name style={styles.campotext}>Usuário</Name>
          <BackgroundInput
            style={styles.input}>
            <TextInput
              placeholder="  Usuário"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={'#8F8F8F'}
            />
          </BackgroundInput>
        </View>
        <BackgroundContainerInput style={styles.campo}>
          <Name style={styles.campotext}>Senha</Name>
          <BackgroundInput
            style={styles.input}>
          <TextInput
            placeholder="  Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor={'#8F8F8F'}
          />
          </BackgroundInput>
        </BackgroundContainerInput>
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        <View style={styles.boxbutton}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.textbutton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.textbutton}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <Name style={[styles.text, { paddingTop: 20 }]}>
          <Text>Logar com</Text>
        </Name>

        <BorderColorButton activeOpacity={0.8} style={styles.button2}>
          <Name style={styles.textbutton2}>Google</Name>
        </BorderColorButton>

        <View style={styles.text}>
          <Name>Ou</Name>
        </View>

        <BorderColorButton activeOpacity={0.8} style={styles.button2}>
          <Name style={styles.textbutton2}>Facebook</Name>
        </BorderColorButton>
      </BackgroundContainerInput>

      <StatusBar style="auto" />
    </Container>
  );
}
