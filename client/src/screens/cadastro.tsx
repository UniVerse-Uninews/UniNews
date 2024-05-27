import { styles } from '../styles/styleCadastro';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { BigHeader } from '../components/addBigHeader/bigHeader';
import { BackgroundContainerInput, BackgroundInput, BackgroundInputText, Container } from '../theme/style';
import { ButtonSpecial } from '../components/addButton/Button';
import { useCrud } from '../hooks/crudHooks';
import  Feather  from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export function Cadastro() {
    const [hidePass, setHidePass] = React.useState(true);
    const [hideConfirmPass, setHideConfirmPass] = React.useState(true);


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
                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'ios' ? "padding" : "height"}
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.containerCadastro}>
                            <Text style={styles.title}>Cadastro</Text>
                        </View>
                        <Text style={styles.subtitle}>Usuário</Text>
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

                        <Text style={styles.subtitle}>E-mail</Text>
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

                        <Text style={styles.subtitle}>Senha</Text>
                        <View style={styles.containerInput}>
                            <BackgroundInput style={styles.inputArea}>
                                <BackgroundInputText
                                    value={user.passwordHash}
                                    style={styles.input}
                                    placeholder='Senha'
                                    secureTextEntry={hidePass}
                                    onChangeText={(text) => handleInputChange('passwordHash', text)}
                                    placeholderTextColor={'#8F8F8F'}
                                />
                                <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                                    {hidePass ? (
                                        <Feather name="eye-off" size={24} color="black" />
                                    ) : (
                                        <Feather name="eye" size={24} color="black" />
                                    )}
                                </TouchableOpacity>
                            </BackgroundInput>
                        </View>

                        <Text style={styles.subtitle}>Confirmar Senha</Text>
                        <View style={styles.containerInput}>
                            <BackgroundInput style={styles.inputArea}>
                                <BackgroundInputText
                                    value={user.confirmPassword}
                                    style={styles.input}
                                    placeholder='Confirmar Senha'
                                    secureTextEntry={hideConfirmPass}
                                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                    placeholderTextColor={'#8F8F8F'}
                                />
                                <TouchableOpacity style={styles.icon}
                                    onPress={() => {setHideConfirmPass(!hideConfirmPass)}}>
                                    {hideConfirmPass ?
                                        <Feather name="eye-off" size={24} color="black" />
                                        :                                        
                                        <Feather name="eye" size={24} color="black" />
                                    }
                            
                                </TouchableOpacity>
                            </BackgroundInput>
                            
                        </View>
                        

                        <View style={styles.containerInput}>
                            <ButtonSpecial etiqueta="Cadastrar" handlePress={addUserHandler} />
                        </View>
                    </KeyboardAvoidingView>
                </BackgroundContainerInput>
            </Container>
        </>
    );
}
