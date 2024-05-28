import { styles } from '../styles/styleCadastro';
import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { BigHeader } from '../components/addBigHeader/bigHeader';
import { BackgroundContainerInput, Name, BackgroundInput, BackgroundInputText, Container } from '../theme/style';
import { ButtonSpecial } from '../components/addButton/Button';
import { useCrud } from '../hooks/crudHooks';
import { InputConfirmSenha, InputSenha } from '../components/addInput/Input';


export function Cadastro({ navigation }: any) {
    const [hidePass, setHidePass] = React.useState(true);
    const [hideConfirmPass, setHideConfirmPass] = React.useState(true);
    const eye= require('../../assets/imagens/eye.png');
    const eyeOff= require('../../assets/imagens/eyeOff.png');


    const {
        user,
        setUser,
        addUserHandler,
    } = useCrud();

    const handleInputChange = (field: string, value: string) => {
        setUser({ ...user, [field]: value });
    };

    return (
        <>
            <BigHeader />
            <Container style={styles.container}>
                <BackgroundContainerInput style={styles.containerDados}>
                    <View
                    >
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
                                    value={user.name}
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
                                    value={user.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                            </BackgroundInput>
                        </View>

                        <InputSenha/>
                        <InputConfirmSenha/>

                        <View style={styles.containerInputCadastro}>
                            <ButtonSpecial etiqueta="Cadastrar" handlePress={addUserHandler} />
                        </View>
                    </View>
                </BackgroundContainerInput>
                <View style={styles.containerLogin}>

                    <Name>Já tem conta?</Name>
                    <Text style={styles.login} onPress={() => navigation.navigate('Login')}> Faça login</Text>
                </View>
            </Container>
        </>
    );
}
