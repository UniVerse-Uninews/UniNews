import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, SafeAreaView, View} from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

import {styles} from '../styles/styleCrudUsuario';
import Button from '../components/addButton/button';
import ImageViewer from '../components/addImageViewer/imageViewer';
import Table from '../components/addTable/table';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dirImagem = require('../../assets/imagens/tcc-logo-quadrado.jpeg');
const http = "http://localhost:8080/api"

export function CrudUsuario() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    nome: "",
    senha: "",
    email: "",
    tipo: "adm"
  });

  const mostrar = () => {
    axios
      .get(`${http}/get`)
      .then((res:any ) => {
        console.log("mostrando")
        setUsers(res.data);
      })
      .catch((err:any) => {
        console.log('Erro ao mostrar');
      });
  };

  const alterar = (email: any) => {
    axios.put(`${http}/update/${email}`, user).catch((err) => { console.log("Erro ao alterar") })
  };

  const add = (e: any) => {
    e.preventDefault();
    axios.post(`${http}/save`, user)
      .then((res:any) => {
        setUser({
          nome: "",
          senha: "",
          email: "",
          tipo: "",
        });
      }).catch((err:any) => {
        console.log("Erro ao adicionar");
      });
  }

  const deleteUser = (email: any) => {
    axios.delete(`${http}/delete/${email}`)
      .catch((err:any) => console.log("Erro ao deletar"))
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cabecalho}> 
          <View style={styles.imageContainer}>
            <ImageViewer diretorio={dirImagem} />
          </View>
          <Text style={styles.nomeLogoAzul}>UNI</Text>  <Text style={styles.nomeLogoPreto}>NEWS</Text>
      </View>
        <SafeAreaView style = {styles.line} />
      <View style={styles.containerDados}>
        <View style={styles.viewDados}>
          <Text style={styles.titulo}>Dados</Text>
          <View style={styles.containerInput}>
            <Text style={styles.campos}>Nome de Usuário</Text>
            <TextInput style={styles.input} value={user.nome} onChange={(n:any) => setUser({ ...user, nome: n.target.value })} />
            <Text style={styles.campos}>Senha</Text>
            <TextInput style={styles.input} value={user.senha} onChange={(s:any) => setUser({ ...user, senha: s.target.value })} />
            <Text style={styles.campos}>E-mail</Text>
            <TextInput style={styles.input} value={user.email} onChange={(e:any) => setUser({ ...user, email: e.target.value })} />
            <Text style={styles.campos}>Tipo</Text>
            <View>
            <RadioButton.Group onValueChange={(tipo: string) => setUser({ ...user, tipo: tipo })} value={user.tipo}>
                <RadioButton.Item label="Administrador" value="adm" uncheckedColor='#91C0E2'
                  color='#3C6294' style={styles.radio} />
                <RadioButton.Item label="Usuário" value="usu" uncheckedColor='#91C0E2'
                  color='#3C6294' style={styles.radio} />
              </RadioButton.Group>
            </View>
          </View>
        </View>
        <View style={styles.botoes}>
          <Button etiqueta="Cadastrar" handlePress={add} />
          <Button etiqueta="Ver Todos" handlePress={mostrar} />
          <Button etiqueta="Alterar" handlePress={alterar} />
          <Button etiqueta="Apagar" handlePress={deleteUser} />
        </View>
      </View>
      <View style={styles.containerTable}>
        <Text style={styles.titulo}>Dados Cadastrados</Text>
        <View style={styles.table}>
          <Table usuarios={users} />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
export default CrudUsuario
