import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

import { styles } from '../styles/styleCrudUsuario';
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
import { InputSenhaSpecial } from '../components/addInput/Input';

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
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nome de Usuário"
                  placeholderTextColor={'#8F8F8F'}
                  value={user.name}
                  onChangeText={(n) => setUser({ ...user, name: n })}
                />
                <BackgroundInputText
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor={'#8F8F8F'}
                  value={user.email}
                  onChangeText={(e) => setUser({ ...user, email: e })}
                />
                <InputSenhaSpecial user={user} setUser={setUser} />

                <TouchableOpacity
                  onPress={() => setUser({ ...user, role: 'ADMIN' })}
                >
                  <View style={styles.radio}>
                    <RadioButton.Android
                      value="ADMIN"
                      status={user.role === 'ADMIN' ? 'checked' : 'unchecked'}
                      onPress={() => setUser({ ...user, role: 'ADMIN' })}
                      uncheckedColor="#91C0E2"
                      color="#3C6294"
                    />
                    <Name style={styles.textRadio}>Administrador</Name>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUser({ ...user, role: 'USER' })}
                >
                  <View style={styles.radio}>
                    <RadioButton.Android
                      value="USER"
                      status={user.role === 'USER' ? 'checked' : 'unchecked'}
                      onPress={() => setUser({ ...user, role: 'USER' })}
                      uncheckedColor="#91C0E2"
                      color="#3C6294"
                    />
                    <Name style={styles.textRadio}>Usuário</Name>
                  </View>
                </TouchableOpacity>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color="#3C6294"
                  />
                  <Name style={styles.textCheckbox}>Desativada?</Name>
                </View>
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
            <NameBlue style={styles.titulo}>Dados Cadastrados</NameBlue>
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
