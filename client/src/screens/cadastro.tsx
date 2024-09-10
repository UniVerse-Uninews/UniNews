import { styles } from '../styles/styleCadastro';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { BigHeader } from '../components/addBigHeader/bigHeader';
import {
  BackgroundContainerInput,
  Name,
  BackgroundInput,
  BackgroundInputText,
  Container,
} from '../theme/style';
import { ButtonSpecial } from '../components/addButton/Button';
import { useCrud } from '../hooks/crudHooks';
import { InputConfirmSenha, InputSenha } from '../components/addInput/Input';

export function Cadastro({ navigation }: any) {
  const { userFields, setUser, addUserHandler } = useCrud();

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...userFields, [field]: value });
  };

  return (
    <>
      <BigHeader />
      <Container style={styles.container}>
        <BackgroundContainerInput style={styles.containerDados}>
          <View>
            <View style={styles.containerCadastro}>
              <Text style={styles.title}>Cadastro</Text>
            </View>
            <Name style={styles.subtitle}>Usuário</Name>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nome"
                  placeholderTextColor={'#8F8F8F'}
                  value={userFields.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                />
              </BackgroundInput>
            </View>

            <Name style={styles.subtitle}>E-mail</Name>
            <View style={styles.containerInput}>
              <BackgroundInput style={styles.inputArea}>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor={'#8F8F8F'}
                  value={userFields.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                />
              </BackgroundInput>
            </View>

            <InputSenha user={userFields} setUser={setUser} />
            <InputConfirmSenha user={userFields} setUser={setUser} />

            <View style={styles.containerInputCadastro}>
              <ButtonSpecial
                etiqueta="Cadastrar"
                handlePress={addUserHandler}
              />
            </View>
          </View>
        </BackgroundContainerInput>
        <View style={styles.containerLogin}>
          <Name>Já tem conta?</Name>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate('Login')}
          >
            {' '}
            Faça login
          </Text>
        </View>
      </Container>
    </>
  );
}
