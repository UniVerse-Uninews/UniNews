// src/screens/loginScreen.tsx
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { loginUser } from '../services/api';
import { styles } from '../styles/styleLogin';

const ImageLogo = require('../../assets/imagens/logomarca-semfundo.png');

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setLoginError('Por favor, preencha todos os campos.');
      return;
    }

    loginUser(username, password)
      .then((response) => {
        console.log('Login successful:', response.data);
        navigation.navigate('CrudUsuario');
      })
      .catch((error) => {
        console.error('Login error:', error);
        setLoginError('Erro ao fazer login. Verifique suas credenciais.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.Uni}>UNI</Text>
        <Text style={styles.News}>NEWS</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.campo}>
          <Text style={styles.campotext}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="  Usuário"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.campotext}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="  Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
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

        <View style={[styles.text, { paddingTop: 20 }]}>
          <Text>Logar com</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.button2}>
          <Text style={styles.textbutton2}>Google</Text>
        </TouchableOpacity>

        <View style={styles.text}>
          <Text>Ou</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.button2}>
          <Text style={styles.textbutton2}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
