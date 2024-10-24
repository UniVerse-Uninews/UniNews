import { styles } from './styleheader';
import React from 'react';
import { View, StatusBar,  SafeAreaView , Pressable} from 'react-native';
import { NameBlue, Name, Line, ContainerCabecalho } from '../../theme/style';
import ImageViewer from '../addImageViewer/ImageViewer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/rootstack';
import GlobalStyles from '../../styles/globalStyle';


type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

export function Header() {
  const navigation = useNavigation<FooterNavigationProp>();
  const dirImagem = require('../../../assets/imagens/tcc-logo-quadrado-sem-fundo.png');
  return (
    <>
    <StatusBar />
     <SafeAreaView style={[styles.container2, GlobalStyles.droidSafeArea]}/>
      
     
                   
    <ContainerCabecalho style={styles.container}>
      <Pressable  onPress={() => navigation.navigate('Feed')}
                >  
      <View style={styles.cabecalho}>
        <View>
          <ImageViewer diretorio={dirImagem} />
        </View>
        <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
        <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
      </View>
      </Pressable>
      <Line style={styles.line} />
    </ContainerCabecalho>
    </>
  );
}
