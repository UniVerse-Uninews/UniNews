import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { styles } from '../styles/styleCrudUsuario';
import Button from '../components/addButton/Button';
import ImageViewer from '../components/addImageViewer/ImageViewer';
import Table from '../components/addTable/Table';
import { useCrud } from '../hooks/crudHooks';
import {Container, NameBlue, NameLogo, Line, BorderColorButton, BorderColorContainer, BorderColorTable} from '../theme/style';

const dirImagem = require('../../assets/imagens/tcc-logo-quadrado-sem-fundo.png');

export function CrudUsuario() {
  const {
    users,
    user,
    setUser,
    fetchUsers,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler
  } = useCrud();

  return (
      <Container style={styles.container}>
        <View style={styles.cabecalho}> 
        <View style={styles.imageContainer}>
          <ImageViewer diretorio={dirImagem} />
        </View>
        <NameBlue style={[ styles.nameLogo]}>UNI</NameBlue>  
        <NameLogo style={[ styles.nameLogo]}>NEWS</NameLogo>
      </View>
      <Line style={styles.line} />
      <View style={styles.containerDados}>
        <View style={styles.viewDados}>
          <NameBlue style={styles.titulo}>Dados</NameBlue>
          <BorderColorContainer style={styles.containerInput}>
            <BorderColorButton 
              style={styles.input} 
              placeholder="Nome de Usuário" 
              value={user.name} 
              onChangeText={(n) => setUser({ ...user, name: n })} 
            />
             <BorderColorButton 
              style={styles.input} 
              placeholder="E-mail" 
              value={user.email} 
              onChangeText={(e) => setUser({ ...user, email: e })} 
            />
            <BorderColorButton 
              style={styles.input} 
              placeholder="Senha" 
              value={user.passwordHash} 
              onChangeText={(s) => setUser({ ...user, passwordHash: s })} 
            />
           
            {/* <TouchableOpacity onPress={() => setUser({...user, tipo: 'adm'})}>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="adm"
                  status={user.tipo === 'adm' ? 'checked' : 'unchecked'}
                  onPress={() => setUser({...user, tipo: 'adm'})}
                  uncheckedColor='#91C0E2'
                  color='#3C6294'
                />
                <Text >Administrador</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUser({...user, tipo: 'usu'})}>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="usu"
                  status={user.tipo === 'usu' ? 'checked' : 'unchecked'}
                  onPress={() => setUser({...user, tipo: 'usu'})}
                  uncheckedColor='#91C0E2'
                  color='#3C6294'
                />
                <Text >Usuário</Text>
              </View>
            </TouchableOpacity> */}
          </BorderColorContainer>
        </View>
        <View style={styles.containerButton}>
          <Button etiqueta="Cadastrar" handlePress={addUserHandler} />
          <Button etiqueta="Ver Todos" handlePress={fetchUsers} />
          <Button etiqueta="Alterar" handlePress={() => updateUserHandler(user.email || '')} />
          <Button etiqueta="Apagar" handlePress={() => deleteUserHandler(user.email || '')} />
        </View>
      </View>
      <View style={styles.containerTable}>
        <Text style={styles.titulo}>Dados Cadastrados</Text>
        <BorderColorTable style={styles.table}>
          <Table users={users} />
        </BorderColorTable>
      </View>
      <StatusBar style="auto" />
      </Container>
        );
}
