import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from '../styles/styleCrudUniversidade';
import { Button } from '../components/addButton/Button';
import Table from '../components/addTable/Table';
import { useCrud } from '../hooks/crudHooks';
import {
  Container,
  ScrollContainer,
  NameBlue,
  Name,
  BackgroundInputText,
  BorderColorTable,
  BackgroundContainerInput,
} from '../theme/style';
import { Header } from '../components/addHeader/header';

export function CrudUsuario() {
  const [isChecked, setChecked] = useState(false);

  const {
    users,
    user,
    setUser,
    fetchUsers,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler,
  } = useCrud();

  const handleRowClick = (clickedUser: any) => {
    setUser(clickedUser);
  };

  return (
    <>
      <Header />
      <Container style={styles.container}>
        <ScrollContainer>
          <View style={styles.containerDados}>
            <View style={styles.viewDados}>
              <NameBlue style={styles.titulo}>Dados</NameBlue>
              <BackgroundContainerInput style={styles.containerInput}>
                <Name>Nome</Name>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nome da Universidade"
                  placeholderTextColor={'#8F8F8F'}
                  value={user.name}
                  onChangeText={(n) => setUser({ ...user, name: n })}
                />
                  <Name>País</Name>
                  <BackgroundInputText
                    style={styles.input}
                    placeholder="País"
                    placeholderTextColor={'#8F8F8F'}
                    value={user.email}
                    onChangeText={(e) => setUser({ ...user, email: e })}
                  />
                   <Name>Estado</Name>
                  <BackgroundInputText
                    style={styles.input}
                    placeholder="Estado"
                    placeholderTextColor={'#8F8F8F'}
                    value={user.email}
                    onChangeText={(e) => setUser({ ...user, email: e })}
                  />
                   <Name>Descrição</Name>
                  <BackgroundInputText
                    style={styles.inputdisc}
                    placeholder="Descrição"
                    placeholderTextColor={'#8F8F8F'}
                    value={user.email}
                    onChangeText={(e) => setUser({ ...user, email: e })}
                  />
               
            
              </BackgroundContainerInput>
            </View>
            <View style={styles.containerButton}>
              <Button etiqueta="Cadastrar" handlePress={addUserHandler} />
              <Button etiqueta="Ver Todos" handlePress={fetchUsers} />
              <Button
                etiqueta="Alterar"
                handlePress={() => updateUserHandler(user.id, user)}
              />
              <Button
                etiqueta="Apagar"
                handlePress={() => deleteUserHandler(user.id)}
              />
            </View>
          </View>
          <View style={styles.containerTable}>
            <NameBlue style={styles.titulo}>Dados Inseridos</NameBlue>
            <BorderColorTable style={styles.table}>
              <Table users={users} onRowClick={handleRowClick} />
            </BorderColorTable>
          </View>
          <StatusBar style="auto" />
        </ScrollContainer>
      </Container>
    </>
  );
}
