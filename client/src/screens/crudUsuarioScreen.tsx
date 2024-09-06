import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Checkbox } from 'expo-checkbox';
import { styles } from '../styles/styleCrudUsuario';
import { Button } from '../components/addButton/Button';
import { Table } from '../components/addTable/Table';
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
import { User } from 'src/@types/interfaces';


export function CrudUsuario() {
  const [isChecked, setChecked] = useState(false);

  const {
    users,
    userFields,
    setUser,
    fetchUsers,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler,
  } = useCrud();

  const handleRowClick = (clickedUser: User) => {
    setUser(clickedUser);
  };

  const clearFields = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      role: '',
      passwordHash: '',
      confirmPassword: '',
    });
    setChecked(false);
  };

  useEffect(() => {
    fetchUsers();
  }
  , []);

  return (
    <>
      <Header />
      <ScrollContainer>
      <Container style={styles.container}>
          <View style={styles.containerDados}>
            <View style={styles.viewDados}>
              <NameBlue style={styles.titulo}>Dados</NameBlue>
              <BackgroundContainerInput style={styles.containerInput}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nome de Usuário"
                  placeholderTextColor={'#8F8F8F'}
                  value={userFields.name}
                  onChangeText={(n) => setUser({ ...userFields, name: n })}
                />
                <BackgroundInputText
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor={'#8F8F8F'}
                  value={userFields.email}
                  onChangeText={(e) => setUser({ ...userFields, email: e })}
                />
                <InputSenhaSpecial user={userFields} setUser={setUser} />

                <TouchableOpacity
                  onPress={() => setUser({ ...userFields, role: 'ADMIN' })}
                >
                  <View style={styles.radio}>
                    <RadioButton.Android
                      value="ADMIN"
                      status={userFields.role === 'ADMIN' ? 'checked' : 'unchecked'}
                      onPress={() => setUser({ ...userFields, role: 'ADMIN' })}
                      uncheckedColor="#91C0E2"
                      color="#3C6294"
                    />
                    <Name style={styles.textRadio}>Administrador</Name>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUser({ ...userFields, role: 'USER' })}
                >
                  <View style={styles.radio}>
                    <RadioButton.Android
                      value="USER"
                      status={userFields.role === 'USER' ? 'checked' : 'unchecked'}
                      onPress={() => setUser({ ...userFields, role: 'USER' })}
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
                handlePress={() => updateUserHandler(userFields.id, userFields)}
              />
              <Button
                etiqueta="Apagar"
                handlePress={() => deleteUserHandler(userFields.id)}
              />
              <Button
                etiqueta="Limpar Campos"
                handlePress={clearFields}
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
      </Container>
      </ScrollContainer>
    </>
  );
}
