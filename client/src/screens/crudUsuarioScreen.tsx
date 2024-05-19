import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { styles } from '../styles/styleCrudUsuario';
import Button from '../components/addButton/Button';
import ImageViewer from '../components/addImageViewer/ImageViewer';
import Table from '../components/addTable/Table';
import { useCrud } from '../hooks/crudHooks';
import {Container, NameBlue, Name, Line, BorderColorInput, BorderColorContainer, BorderColorTable} from '../theme/style';

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

  const handleRowClick = (clickedUser: any) => {
    setUser(clickedUser);
};


  return (
      <Container style={styles.container}>
        <View style={styles.cabecalho}> 
        <View style={styles.imageContainer}>
          <ImageViewer diretorio={dirImagem} />
        </View>
        <NameBlue style={[ styles.nameLogo]}>UNI</NameBlue>  
        <Name style={[ styles.nameLogoSecondary]}>NEWS</Name>
      </View>
      <Line style={styles.line} />
      <View style={styles.containerDados}>
        <View style={styles.viewDados}>
          <NameBlue style={styles.titulo}>Dados</NameBlue>
          <BorderColorContainer style={styles.containerInput}>
            <BorderColorInput 
              style={styles.input}  
              placeholder="Nome de Usuário" 
              value={user.name} 
              onChangeText={(n) => setUser({ ...user, name: n })} 
            />
             <BorderColorInput 
              style={styles.input} 
              placeholder="E-mail" 
              value={user.email} 
              onChangeText={(e) => setUser({ ...user, email: e })} 
            />
            <BorderColorInput 
              style={styles.input} 
              placeholder="Senha" 
              value={user.passwordHash} 
              onChangeText={(s) => setUser({ ...user, passwordHash: s })} 
            />
           
            <TouchableOpacity onPress={() => setUser({...user, role: true})}>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="adm"
                  status={user.role === true ? 'checked' : 'unchecked'}
                  onPress={() => setUser({...user, role: true})}
                  uncheckedColor='#91C0E2'
                  color='#3C6294'
                />
                <Name style={styles.textRadio}>Administrador</Name>
              </View>
            </TouchableOpacity>
              
                <TouchableOpacity onPress={() => setUser({...user, role: false})}>
                  <View style={styles.radio}>
                <RadioButton.Android
                  value="usu"
                  status={user.role === false ? 'checked' : 'unchecked'}
                  onPress={() => setUser({...user, role: false})}
                  uncheckedColor='#91C0E2'
                  color='#3C6294'
                />
                <Name style={styles.textRadio}>Usuário</Name>
                  </View>
                </TouchableOpacity> 
              
          </BorderColorContainer>
        </View>
        <View style={styles.containerButton}>
          <Button etiqueta="Cadastrar" handlePress={addUserHandler} />
          <Button etiqueta="Ver Todos" handlePress={fetchUsers} />
          <Button etiqueta="Alterar" handlePress={() => updateUserHandler(user.id, user)} />
          <Button etiqueta="Apagar" handlePress={() => deleteUserHandler(user.id)} />
        </View>
      </View> 
      <View style={styles.containerTable}>
        <Name style={styles.titulo}>Dados Cadastrados</Name>
        <BorderColorTable style={styles.table}>
          <Table users={users} onRowClick={handleRowClick} />
        </BorderColorTable>
      </View>
      <StatusBar style="auto" />
      </Container>
        );
}
