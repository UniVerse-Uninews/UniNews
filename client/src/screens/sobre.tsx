import { View, Image, ScrollView } from "react-native";
import React from "react";
import { Header } from "../components/addHeader/header";
import { Footer } from "../components/addFooter/footer";
import {
  Name,
  Container,
  NameBlue,
  NameBlueDark,
  Perfil,
} from "../theme/style";
import { styles } from "../styles/styleSobre";
const dirApp = require("../../assets/imagens/tcc-logo-quadrado-sem-fundo.png");
const dirLogo = require("../../assets/imagens/logomarcaUniverse.png");
const Arthur = require("../../assets/imagens/imgArthur.jpeg");
const Miguel = require("../../assets/imagens/imgMiguel.jpeg");
const Ryandro = require("../../assets/imagens/imgRyandro.jpeg");
const Carol = require("../../assets/imagens/imgCarol.jpeg");
const Pedro = require("../../assets/imagens/imgPedro.jpeg");
const Gustavo = require("../../assets/imagens/imgGustavo.jpeg");
const Analara = require("../../assets/imagens/imgAnaLara.jpg");

export function Sobre() {
  return (
    <>
      <Header />
      <Container style={styles.container}>
        <ScrollView>
          <NameBlueDark style={styles.sobre}>Sobre Nós</NameBlueDark>
          <NameBlue style={styles.titulo1}>UNINEWS</NameBlue>
          <View style={styles.titulo}>
            <Image style={styles.Logo} source={dirApp} />
            <View style={styles.textos}>
              <Name style={styles.subtitulo1}>
                Este projeto trata-se de um veiculador mobile de notícias e
                pesquisas universitárias.{" "}
              </Name>
              <Name style={styles.subtitulo1}>
                O principal intuito desta plataforma é não apenas facilitar o
                acesso a informações acadêmicas, mas também apresentá-las de
                maneira confiável e diretamente da fonte, direcionadas aos
                interesses do usuário.
              </Name>
            </View>
          </View>

          <NameBlueDark style={styles.sobre}>Quem Somos</NameBlueDark>
          <NameBlue style={styles.titulo1}>UNIVERSE</NameBlue>
          <View style={styles.titulo}>
            <Image style={styles.Logo} source={dirLogo} />

            <View style={styles.textos}>
              <Name style={styles.subtitulo1}>
                A empresa surgiu em março de 2024, a partir do desenvolvimento
                de um projeto de TCC.
              </Name>
              <Name style={styles.subtitulo1}>
                A UNIVERSE é inovadora no setor de tecnologia da informação,
                dedicada à veiculação de notícias universitárias para facilitar
                e otimizar a noção de atualidade e a pesquisa científica.
              </Name>
            </View>
          </View>

          <NameBlueDark style={styles.sobre}>Desenvolvedores</NameBlueDark>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Arthur}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Arthur Ximenes Orsolini</Name>
              <Name style={styles.texto1}>PM/PO</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Miguel}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Miguel Angelo De Lima Godoi</Name>
              <Name style={styles.texto1}>Lider Técnico</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Ryandro}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Ryandro Zerlin Moriizumi</Name>
              <Name style={styles.texto1}>Lider UX/UI</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Analara}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Ana Lara Picalio</Name>
              <Name style={styles.texto1}>Desenvolvedora</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Carol}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Carol Xavier Mazon</Name>
              <Name style={styles.texto1}>Desenvolvedora</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Gustavo}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Gustavo Carvalho Polido</Name>
              <Name style={styles.texto1}>Desenvolvedor</Name>
            </View>
          </Perfil>

          <Perfil style={styles.perfil}>
            <View style={styles.foto1}>
              <View style={styles.foto}>
                <Image
                  style={styles.fotinha}
                  source={Pedro}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.texto}>
              <Name style={styles.texto1}>Pedro A. O. G. Ribeiro</Name>
              <Name style={styles.texto1}>Desenvolvedor</Name>
            </View>
          </Perfil>
        </ScrollView>
      </Container>

      <Footer />
    </>
  );
}
