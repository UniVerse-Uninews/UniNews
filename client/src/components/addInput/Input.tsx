import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from './inputStyle';
import { BackgroundInput, BackgroundInputText, Name } from '../../theme/style';

export function InputSenha({ user, setUser }: any) {
  const eye = 'http://projetoscti.com.br/projetoscti27/uninews/img/eye.png';
  const eyeOff ='http://projetoscti.com.br/projetoscti27/uninews/img/eyeOff.png';

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
            placeholder="Senha"
            secureTextEntry={hidePass}
            onChangeText={(text) => handleInputChange('passwordHash', text)}
            placeholderTextColor={'#8F8F8F'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePass(!hidePass)}
          >
            {hidePass ? (
              <Image source={{uri: eye}} style={styles.icon} />
            ) : (
              <Image source={{uri: eyeOff}} style={styles.icon} />
            )}
          </TouchableOpacity>
        </BackgroundInput>
      </View>
    </View>
  );
}
export function InputConfirmSenha({ user, setUser }: any) {
  const eye = 'http://projetoscti.com.br/projetoscti27/uninews/img/eye.png';
  const eyeOff ='http://projetoscti.com.br/projetoscti27/uninews/img/eyeOff.png';
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
            placeholder="Confirmar Senha"
            secureTextEntry={hideConfirmPass}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            placeholderTextColor={'#8F8F8F'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
          >
            {hideConfirmPass ? (
              <Image source={{uri: eye}} style={styles.icon} />
            ) : (
              <Image source={{uri: eyeOff}} style={styles.icon} />
            )}
          </TouchableOpacity>
        </BackgroundInput>
      </View>
    </View>
  );
}
export function InputSenhaSpecial({ user, setUser }: any) {
  return (
    <BackgroundInputText
      style={styles.inputSpecial}
      placeholder="Senha"
      placeholderTextColor={'#8F8F8F'}
      value={user.passwordHash}
      onChangeText={(s) => setUser({ ...user, passwordHash: s })}
    />
  );
}

export function InputSenhaSpecialAdmin({ user, setUser }: any) {
  return (
    <>
    <BackgroundInputText
      style={styles.inputSpecial}
      placeholder="Senha"
      placeholderTextColor={'#8F8F8F'}
      value={user.passwordHash}
      onChangeText={(s) => setUser({ ...user, passwordHash: s })}
      secureTextEntry={true} 
    />

    <BackgroundInputText
        style={styles.inputSpecial}
        placeholder="Confirmar Senha"
        placeholderTextColor={'#8F8F8F'}
        value={user.confirmPassword}
        onChangeText={(s) => setUser({ ...user, confirmPassword: s })}
        secureTextEntry={true} 
      />
    </>
  );
}
export function InputAlteraSenha({ user, setUser }: any) {
  const eye = 'http://projetoscti.com.br/projetoscti27/uninews/img/eye.png';
  const eyeOff ='http://projetoscti.com.br/projetoscti27/uninews/img/eyeOff.png';
  const [hideConfirmPass, setHideConfirmPass] = React.useState(true);

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };
  return (
    <View>
      <View style={styles.containerInput}>
        <BackgroundInput style={styles.inputArea}>
          <BackgroundInputText
            value={user.confirmPassword}
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={hideConfirmPass}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            placeholderTextColor={'#8F8F8F'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
          >
            {hideConfirmPass ? (
              <Image source={{uri: eye}} style={styles.icon} />
            ) : (
              <Image source={{uri: eyeOff}} style={styles.icon} />
            )}
          </TouchableOpacity>
        </BackgroundInput>
      </View>
    </View>
  );
}
export function InputConfirmAlteraSenha({ user, setUser }: any) {
  const eye = 'http://projetoscti.com.br/projetoscti27/uninews/img/eye.png';
  const eyeOff ='http://projetoscti.com.br/projetoscti27/uninews/img/eyeOff.png';
  const [hideConfirmPass, setHideConfirmPass] = React.useState(true);

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };
  return (
    <View>
      <View style={styles.containerInput}>
        <BackgroundInput style={styles.inputArea}>
          <BackgroundInputText
            value={user.confirmPassword}
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry={hideConfirmPass}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            placeholderTextColor={'#8F8F8F'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
          >
            {hideConfirmPass ? (
              <Image source={{uri: eye}} style={styles.icon} />
            ) : (
              <Image source={{uri: eyeOff}} style={styles.icon} />
            )}
          </TouchableOpacity>
        </BackgroundInput>
      </View>
    </View>
  );
}
