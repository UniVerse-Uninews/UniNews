import { styles } from '../styles/styleCadastro';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { BigHeader } from '../components/addBigHeader/bigHeader';
import { BackgroundContainerInput, BackgroundInput, Container } from '../theme/style';
import {ButtonSpecial} from '../components/addButton/Button';
import { useCrud } from '../hooks/crudHooks';
import {Ionicons} from '@expo/vector-icons';



export function Cadastro() {
    const [input, setInput] = React.useState('');
    const [hidePass, setHidePass] = React.useState(true);
    const [input1, setInput1] = React.useState('');
    const {
        addUserHandler
      } = useCrud();
    return (
        <>
            <BigHeader />
            <Container style={styles.container}>
                <BackgroundContainerInput style={styles.containerDados}>
                <KeyboardAvoidingView  
                behavior={Platform.OS=='ios' ?"padding": "height"}
                keyboardVerticalOffset={100}>
                    <View style={styles.containerCadastro}>
                        <Text style={styles.title}>Cadastro</Text>
                    </View>
                    <Text style={styles.subtitle}>Usuário</Text>
                    <View style={styles.containerInput}>  
                        <BackgroundInput style={styles.inputArea}>
                        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={'#8F8F8F'}/>
                        </BackgroundInput>
                    </View>

                    <Text style={styles.subtitle}>E-mail</Text>
                    <View style={styles.containerInput}> 
                        <BackgroundInput style={styles.inputArea}> 
                        <TextInput style={styles.input} placeholder="E-mail"  placeholderTextColor={'#8F8F8F'}/>
                        </BackgroundInput>
                    </View>
                    
                    <Text style={styles.subtitle}>Senha</Text>
                    <View style={styles.containerInput}>  
                        <BackgroundInput style={styles.inputArea}>
                            <TextInput 
                                value={input} 
                                style={styles.input}
                                placeholder='Senha'
                                secureTextEntry={true}
                                onChangeText={(text)=>setInput(text)}
                                placeholderTextColor={'#8F8F8F'}
                            />
                            <TouchableOpacity style={styles.icon} 
                            onPress={()=>setHidePass(!hidePass)}>
                                {hidePass ?
                                <Ionicons name={'eye'} size={24} color="black" />
                                :
                                <Ionicons name={'eye-off'} size={24} color="black" />
                                }
                                </TouchableOpacity>
                        
                        </BackgroundInput>
                    </View>
                    
                    <Text style={styles.subtitle}>Confirmar Senha</Text>
                    <View style={styles.containerInput}>  
                        <BackgroundInput style={styles.inputArea}>
                            <TextInput 
                                value={input1} 
                                style={styles.input} 
                                placeholder='Confirmar Senha'
                                secureTextEntry={true}
                                onChangeText={(text)=>setInput1(text)}
                                placeholderTextColor={'#8F8F8F'}
                                                            />
                            <TouchableOpacity style={styles.icon}
                            onPress={()=>setHidePass(!hidePass)}>
                                 {hidePass ?
                                <Ionicons name={'eye'} size={24} color="black" />
                                :
                                <Ionicons name={'eye-off'} size={24} color="black" />
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