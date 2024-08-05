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
    const dir_left_set = require("../../assets/imagens/left-arrow.png");
    const dir_down_set = require("../../assets/imagens/down-arrow.png");

    const [getText, setText] = useState("");
    const onChangeText = (text: string) => {
        setText(text);
    };

    const [isOpenUniv, setIsOpenUniv] = useState(false);
    const [isOpenArea, setIsOpenArea] = useState(false);
    const [isOpenLoc, setIsOpenLoc] = useState(false);

    const dropdownAniUniv = useRef(new Animated.Value(0)).current;
    const dropdownAniArea = useRef(new Animated.Value(0)).current;
    const dropdownAniLoc = useRef(new Animated.Value(0)).current;

    const drawer = useRef<DrawerLayoutAndroid>(null);

    const univ_filter = ['teste'];
    const area_filter = ['teste'];
    const loc_filter = ['teste'];
    
    const toggleDropdownUniv = () => {
        setIsOpenUniv(!isOpenUniv);
        Animated.timing(dropdownAniUniv, {
            toValue: isOpenUniv ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const toggleDropdownArea = () => {
        setIsOpenArea(!isOpenArea);
        Animated.timing(dropdownAniArea, {
            toValue: isOpenArea ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const toggleDropdownLoc = () => {
        setIsOpenLoc(!isOpenLoc);
        Animated.timing(dropdownAniLoc, {
            toValue: isOpenLoc ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };
    
    const delete_univ_filter = (index : number) => {
        univ_filter.splice(index,1);
    };

    const delete_area_filter = (index : number) => {
        univ_filter.splice(index,1);
    };
    
    const delete_loc_filter = (index : number) => {
        univ_filter.splice(index,1);
    };

    const drawerView = () => (
        <View>
            <Pressable onPress={toggleDropdownUniv} style={{flexDirection:'row'}}><Text>Universidade</Text>{!isOpenUniv ? <Image source={dir_left_set}/> : <Image source={dir_down_set}/>}</Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniUniv.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={cache}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {univ_filter.map((univ, index) => {
                    return(
                        <>
                        <Text>univ</Text><Pressable onPress={delete_univ_filter(index)}><Text>X</Text></Pressable>
                        </>
                    );
                })}
            </Animated.View>

            <Pressable onPress={toggleDropdownArea} style={{flexDirection:'row'}}><Text>Área</Text>{!isOpenUniv ? <Image source={dir_left_set}/> : <Image source={dir_down_set}/>}</Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniArea.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={cache}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {area_filter.map((area, index) => {
                    return(
                        <>
                        <Text>univ</Text><Pressable onPress={delete_area_filter(index)}><Text>X</Text></Pressable>
                        </>
                    );
                })}
            </Animated.View>

            <Pressable onPress={toggleDropdownLoc} style={{flexDirection:'row'}}><Text>Localidade</Text>{!isOpenUniv ? <Image source={dir_left_set}/> : <Image source={dir_down_set}/>}</Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniLoc.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={cache}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {loc_filter.map((loc, index) => {
                    return(
                        <>
                        <Text>univ</Text><Pressable onPress={delete_loc_filter(index)}><Text>X</Text></Pressable>
                        </>
                    );
                })}
            </Animated.View>
        </View>
    );

    const universities = ["teste"]; /*fazer função para retornar as universidades nesse vetor conforme escreve*/

    const cache = () => { return "oi" }; /*fazer funcao para mostrar historico de pesquisas ao clicar na barra*/

    const history = ["teste"]; /*guardar retorno do historico neste vetor*/

    return (
        <>
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={'right'}
                renderNavigationView={drawerView}
            >
                <Header />
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
                <Footer />
                </DrawerLayoutAndroid>
        </>
    );
}
