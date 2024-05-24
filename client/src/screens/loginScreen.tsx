import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
         TextInput, 
         View, 
         Text, 
         SafeAreaView,
         TouchableOpacity,
         Image } from 'react-native';
import React from 'react';
import { styles } from '../styles/styleLogin';

const ImageLogo = require("../../assets/imagens/logomarca-semfundo.png");

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.logo}>
       <Text style={styles.Uni}>UNI</Text><Text style={styles.News}>NEWS</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.campo}>        
          <Text style={styles.campotext}>Usuário</Text>
          <TextInput style={styles.input} placeholder="  Usuário"/>
        </View>
        <View style={styles.campo}>
          <Text style={styles.campotext}>Senha</Text>
          <TextInput style={styles.input} placeholder="  Senha"/>
        </View>
        <View style={styles.boxbutton}>
          <TouchableOpacity activeOpacity={.8} style={styles.button}>
            <Text style={styles.textbutton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} style={styles.button}>
            <Text style={styles.textbutton}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      <View style={[styles.text, {paddingTop:20}]}>
        <Text>Logar com</Text>
      </View>

          <TouchableOpacity activeOpacity={.8} style={styles.button2}>
            <Text style={styles.textbutton2}>Google</Text>
          </TouchableOpacity>

        <View style={styles.text}>
          <Text>Ou</Text>
        </View>

          <TouchableOpacity activeOpacity={.8} style={styles.button2}>
              <Text style={styles.textbutton2}>Facebook</Text>
          </TouchableOpacity>


      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}