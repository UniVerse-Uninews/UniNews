import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './buttonStyle';
import { ColorButton } from '../../theme/style';

export function Button({
  etiqueta,
  handlePress,
}: {
  etiqueta: any;
  handlePress: any;
}) {
  return (
    <View style={styles.botaoContainer}>
      <ColorButton style={styles.botao} onPress={handlePress}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
      </ColorButton>
    </View>
  );
}
export function ButtonSpecial({
  etiqueta,
  handlePress,
}: {
  etiqueta: any;
  handlePress: any;
}) {
  return (
    <View style={styles.botaoContainer}>
      <TouchableOpacity style={styles.btnSpecial} onPress={handlePress}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
      </TouchableOpacity>
    </View>
  );
}
