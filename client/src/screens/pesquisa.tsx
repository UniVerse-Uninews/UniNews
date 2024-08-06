import React, { useRef, useState } from 'react';
import { styles } from '@styles/stylePesquisa';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, Image, ScrollView, Pressable, Animated } from 'react-native';
import { university } from '../@types/university';
import { TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

export function pesquisar({ navigation }: any, university: university) {

    const dir_lupa = require("../../assets/imagens/lupa-icon-pesquisa.png");
    const dir_filtro = require("../../assets/imagens/filtro-pesquisa.png");
    const dir_seta_filtro = require("../../assets/imagens/icon_setinha_filtro.png");

    const [getText, setText] = useState("");
    
    const onChangeText = (search : string) => {
        setText(search);
    };

    const [isOpenUniv, setIsOpenUniv] = useState(false);
    const [isOpenArea, setIsOpenArea] = useState(false);
    const [isOpenLoc, setIsOpenLoc] = useState(false);

    const dropdownAniUniv = useRef(new Animated.Value(0)).current;
    const dropdownAniArea = useRef(new Animated.Value(0)).current;
    const dropdownAniLoc = useRef(new Animated.Value(0)).current;

    const Drawer = createDrawerNavigator();

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

    function CustomDrawer(props: DrawerContentComponentProps){
        return (
<View>
            <Pressable onPress={toggleDropdownUniv} style={{flexDirection:'row'}}><Text>Universidade</Text><View style={{width:15}}>{!isOpenUniv ? <Image style={{width: 15,transform:[{rotateX: '0deg'}]}} source={dir_seta_filtro}/> : <Image style={{width: 15,transform:[{rotateX: '90deg'}]}} source={dir_seta_filtro}/>}</View></Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniUniv.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={()=>{}}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {univ_filter.map((univ, index) => {
                    return(
                        <View style={{flexDirection:'row'}}>
                        <Text>univ</Text><Pressable onPress={() => delete_univ_filter(index)}><Text>X</Text></Pressable>
                        </View>
                    );
                })}
            </Animated.View>

            <Pressable onPress={toggleDropdownArea} style={{flexDirection:'row'}}><Text>Área</Text>{!isOpenUniv ? <Image style={{width: 15,transform:[{rotateX: '0deg'}]}} source={dir_seta_filtro}/> : <Image style={{width: 15,transform:[{rotateX: '90deg'}]}} source={dir_seta_filtro}/>}</Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniArea.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={()=>{}}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {area_filter.map((area, index) => {
                    return(
                        <View style={{flexDirection:'row'}}>
                        <Text>univ</Text><Pressable onPress={() => delete_area_filter(index)}><Text>X</Text></Pressable>
                        </View>
                    );
                })}
            </Animated.View>

            <Pressable onPress={toggleDropdownLoc} style={{flexDirection:'row'}}><Text>Localidade</Text>{!isOpenUniv ? <Image style={{width: 15,transform:[{rotateX: '0deg'}]}} source={dir_seta_filtro}/> : <Image style={{width: 15,transform:[{rotateX: '90deg'}]}} source={dir_seta_filtro}/>}</Pressable>
            <Animated.View style={[styles.dropdown, {
                height: dropdownAniLoc.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], // Altura do dropdown expandido
                })
            }]}>
                <Pressable onPress={()=>{}}><Image source={dir_lupa} /><TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={onChangeText} value={getText} /></Pressable>
                {loc_filter.map((loc, index) => {
                    return(
                        <View style={{flexDirection:'row'}}>
                        <Text>univ</Text><Pressable onPress={() => delete_loc_filter(index)}><Text>X</Text></Pressable>
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
    }

    function Teste(){
        return(
            <></>
        );
    }

    function FilterDrawer(){
        return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
            <Drawer.Screen name="teste" component={Teste}/>
        </Drawer.Navigator>
    );
}

    const preresult = ["homi mata"]; /*fazer função para retornar as universidades nesse vetor conforme escreve*/
    const result = ["noticia1"];
    const cache = () => { return "oi" }; /*fazer funcao para mostrar historico de pesquisas ao clicar na barra*/

    const history = ["historico"]; /*guardar retorno do historico neste vetor*/

    //ao clicar na barra de pesquisa, o historico deve aparecer como opcao flutuante, e o resultado preliminar ir aparecendo conforme pesquisa
    return (
        <>
            <NavigationContainer>
                <FilterDrawer/>
                <Header />
                <Container style={styles.container1}>
                    <View style={styles.container2}>
                        <Pressable onPress={cache}>
                            <Image source={dir_lupa} style={styles.impesqui}/>
                            <TextInput
                                placeholder='pesquisar'
                                onChangeText={onChangeText}
                                value={getText}
                                style={styles.pesquisa}
                            />
                        </Pressable>
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <Image style={styles.filtro} source={dir_filtro} />
                        </Pressable>
                    </View>

                    {preresult.length > 0 && (
                            <View>
                                {preresult.map((name, index) => {
                                    return (<React.Fragment key={index}>
                                        <Text onPress={() => {setText(name)}}>{name}</Text>
                                        <View />
                                    </React.Fragment>);
                                })}
                            </View>
                        )}

                        {history.length > 0 && (
                            <View>
                                {history.map((name, index) => {
                                    return (<React.Fragment key={index}>
                                        <Text onPress={() => {setText(name)}}>{name}</Text>
                                        <View />
                                    </React.Fragment>);
                                })}
                            </View>
                        )}

                        {result.length > 0 && (
                            <ScrollView>
                                {result.map(() => {
                                    return(
                                        <Text>Noticias aparecerao aqui</Text>
                                    );
                                })}
                            </ScrollView>
                        )}
                </Container>
                <Footer />
                </NavigationContainer>
        </>
    );
}
