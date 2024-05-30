import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './inputStyle';
import { BackgroundInput, BackgroundInputText, Name } from '../../theme/style';
import { useCrud } from '../../hooks/crudHooks';

export function InputSenha({ user, setUser }: any) {

    const eye = require('../../../assets/imagens/eye.png');
    const eyeOff = require('../../../assets/imagens/eyeOff.png');

    const [hidePass, setHidePass] = React.useState(true);


    const handleInputChange = (field: string, value: string) => {
        setUser({ ...user, [field]: value });
    };


    return (
        <View>
            <Name style={styles.subtitle}>Senha</Name>
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
                            <Image source={eye} style={styles.icon} />
                        ) : (
                            <Image source={eyeOff} style={styles.icon} />
                        )}
                    </TouchableOpacity>
                </BackgroundInput>
            </View>
        </View>
    );
}
export function InputConfirmSenha({ user, setUser }: any) {


    const eye = require('../../../assets/imagens/eye.png');
    const eyeOff = require('../../../assets/imagens/eyeOff.png');

    const [hideConfirmPass, setHideConfirmPass] = React.useState(true);


    const handleInputChange = (field: string, value: string) => {
        setUser({ ...user, [field]: value });
    };
    return (
        <View>
            <Name style={styles.subtitle}>Confirmar Senha</Name>
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
                    <TouchableOpacity style={styles.icon} onPress={() => setHideConfirmPass(!hideConfirmPass)}>
                        {hideConfirmPass ?
                            <Image source={eye} style={styles.icon} />
                            :
                            <Image source={eyeOff} style={styles.icon} />
                        }
                    </TouchableOpacity>
                </BackgroundInput>
            </View>
        </View>
    );
}
export function InputSenhaSpecial({ user, setUser} : any) {
   
    return (
        <BackgroundInputText
            style={styles.inputSpecial}
            placeholder="Senha"
            placeholderTextColor={'#8F8F8F'}
            value={user.passwordHash}
            onChangeText={(s) => setUser({ ...user, passwordHash: s })}
        />
    )
};