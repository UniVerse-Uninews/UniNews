import { styles } from '../styles/styleCadastro';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BigHeader } from '../components/addBigHeader/bigHeader';
import { Container } from '../theme/style';
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
                <View style={styles.containerDados}>
                    <View style={styles.containerCadastro}>
                        <Text style={styles.title}>Cadastro</Text>
                    </View>
                    <Text style={styles.subtitle}>Usuário</Text>
                    <View style={styles.containerInput}>  
                        <View style={styles.inputArea}>
                        <TextInput style={styles.input} placeholder="Nome"/>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>E-mail</Text>
                    <View style={styles.containerInput}> 
                        <View style={styles.inputArea}> 
                        <TextInput style={styles.input} placeholder="E-mail"/>
                        </View>
                    </View>
                    
                    <Text style={styles.subtitle}>Senha</Text>
                    <View style={styles.containerInput}>  
                        <View style={styles.inputArea}>
                            <TextInput 
                                value={input} 
                                style={styles.input}
                                placeholder='Senha'
                                secureTextEntry={true}
                                onChangeText={(text)=>setInput(text)}
                            />
                            <TouchableOpacity style={styles.icon} 
                            onPress={()=>setHidePass(!hidePass)}>
                                {hidePass ?
                                <Ionicons name={'eye'} size={24} color="black" />
                                :
                                <Ionicons name={'eye-off'} size={24} color="black" />
                                }
                                </TouchableOpacity>
                        
                        </View>
                    </View>
                    
                    <Text style={styles.subtitle}>Confirmar Senha</Text>
                    <View style={styles.containerInput}>  
                        <View style={styles.inputArea}>
                            <TextInput 
                                value={input1} 
                                style={styles.input} 
                                placeholder='Confirmar Senha'
                                secureTextEntry={true}
                                onChangeText={(text)=>setInput1(text)}
                                                            />
                            <TouchableOpacity style={styles.icon}
                            onPress={()=>setHidePass(!hidePass)}>
                                 {hidePass ?
                                <Ionicons name={'eye'} size={24} color="black" />
                                :
                                <Ionicons name={'eye-off'} size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInput}>  
                        <ButtonSpecial etiqueta="Cadastrar" handlePress={addUserHandler} />
                    </View>
                </View>
            </Container>
        </>
    );
}