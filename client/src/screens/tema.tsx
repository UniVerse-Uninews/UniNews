
import { Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Header } from '../components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import {
  Name,
  Container,
  NameBlue,
  Textbox,
  Subbox,
} from '../theme/style';
import { styles } from '../styles/styleTema';


export  function Temas() {
  return (
    <>
      <ScrollView>
        <Header />

        <View style={styles.container}>

          <Container style={styles.modo}>


            <View style={styles.titulo} >
              <NameBlue style={[styles.nameLogo]}>UNI</NameBlue>
              <Name style={[styles.nameLogoSecondary]}>NEWS</Name>
            </View>

            <View style={styles.subtitulo}>
              <Textbox style={styles.textosub}>Seja bem-vindo(a) a sua janela para o mundo acadêmico.
                Para começar, selecione suas áreas de interesse para personalizar sua experiência.
              </Textbox>
              <Textbox style={styles.textosub2}>
                Vamos lá</Textbox>
            </View>


            <NameBlue style={styles.titulo1}>TEMAS</NameBlue>

            <View style={styles.box}>

              <Subbox style={styles.subbox}>

                <Image />
                <Text style={styles.tema}>  BIOLÓGICAS</Text>

              </Subbox>

              <Subbox style={styles.subbox}>

                <Image />
                <Text style={styles.tema}>    HUMANAS</Text>

              </Subbox>
            </View>

            <View style={styles.box}>

              <Subbox style={styles.subbox}>
                <Image />
                <Text style={styles.tema}>      EXATAS</Text>
              </Subbox>

              <Subbox style={styles.subbox}>
                <Image />
                <Text style={styles.tema}>TECNOLOGIAS</Text>
              </Subbox>

            </View>
          </Container>
        </View>

      </ScrollView>
      <Footer />
    </>
  );
}
