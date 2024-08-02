import React, { useRef, useState } from 'react';
import { styles } from '@styles/stylePesquisa';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, Image, ScrollView, Pressable, DrawerLayoutAndroid, Animated } from 'react-native';
import { university } from '../@types/university';
import { TextInput } from 'react-native-paper';

export function pesquisar({ navigation }: any, university: university) {

    const dir_lupa = require("../../assets/imagens/lupa-icon-pesquisa.png");
    const dir_filtro = require("../../assets/imagens/filtro-pesquisa.png");
    const dir_up_set = require("../../assets/imagens/up-arrow.png");
    const dir_down_set = require("../../assets/imagens/down-arrow.png");

    const [getText, setText] = useState("");
    const onChangeText = (text: string) => {
        setText(text);
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownAni = useRef(new Animated.Value(0)).current;

    const drawer = useRef<DrawerLayoutAndroid>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        Animated.timing(dropdownAni, {
            toValue: isOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const drawerView = () => (
        <View>
            <Pressable onPress={toggleDropdown}><Text>Universidade</Text></Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAni.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50], // Altura do dropdown expandido
                })
            }]}>
                <Text>Item 1</Text>
                <Text>Item 2</Text>
                <Text>Item 3</Text>
            </Animated.View>
            <Pressable onPress={toggleDropdown}><Text>Área</Text></Pressable>

            <Pressable onPress={toggleDropdown}><Text>Estado</Text></Pressable>
        </View>
    );

    const universities = ["teste"]; /*fazer função para retornar as universidades nesse vetor conforme escreve*/

    const cache = () => { return "oi" }; /*fazer funcao para mostrar historico de pesquisas ao clicar na barra*/

    const history = ["teste"]; /*guardar retorno do historico neste vetor*/

    return (
        <>
            <Header />
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={'right'}
                renderNavigationView={drawerView}
            >
                <Container style={styles.container1}>
                    <View style={styles.container2}>
                        <Pressable onPress={cache}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>

                        {universities.length > 0 && (
                            <View>
                                {universities.map((name, index) => {
                                    return (<React.Fragment key={index}>
                                        <Text>{name}</Text>
                                        <View />
                                    </React.Fragment>);
                                })}
                            </View>
                        )}

                        {history.length > 0 && (
                            <View>
                                {history.map((name, index) => {
                                    return (<React.Fragment key={index}>
                                        <Text>{name}</Text>
                                        <View />
                                    </React.Fragment>);
                                })}
                            </View>
                        )}


                        <Pressable onPress={() => drawer.current?.openDrawer()}>
                            <Image style={styles.filtro} source={dir_filtro} />
                        </Pressable>
                    </View>

                    <ScrollView>
                        <Text>teste</Text>
                    </ScrollView>
                </Container>
            </DrawerLayoutAndroid>
            <Footer />
        </>
    );
}
