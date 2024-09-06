import { styles } from './styleheader';
import React from 'react';
import { View, StatusBar,  SafeAreaView , Pressable, Platform} from 'react-native';
import { Container, NameBlue, Name, Line } from '../../theme/style';
import ImageViewer from '../addImageViewer/ImageViewer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack';

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Header() {
  const navigation = useNavigation<FooterNavigationProp>();
  const dirImagem = 'http://projetoscti.com.br/projetoscti27/uninews/img/tcc-logo-quadrado-sem-fundo.png';
  return (
    <>
    <StatusBar />
     <SafeAreaView style={styles.container2}>
      
     </SafeAreaView>
     
                   
    <Container style={styles.container}>
      <Pressable  onPress={() => navigation.navigate('Feed')}
                >  
      <View style={styles.cabecalho}>
        <View>
          <ImageViewer diretorio={{uri: dirImagem}} />
        </View>
        <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
        <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
      </View>
      </Pressable>
      <Line style={styles.line} />
    </Container>
    </>
  );
}
