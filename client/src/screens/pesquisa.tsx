import React, { useRef, useState } from 'react';
import { styles } from '@styles/stylePesquisa';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, Image, ScrollView, Pressable, Animated } from 'react-native';
import { university } from '../@types/university';
import { TextInput } from 'react-native-paper';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

const dir_lupa = require('../../assets/imagens/lupa-icon-pesquisa.png');
const dir_filtro = require('../../assets/imagens/icon_filtro.png');
const dir_seta_filtro = require('../../assets/imagens/icon_setinha_filtro.png');
const dir_seta_volta = require('../../assets/imagens/Arrow.png');

const Drawer = createDrawerNavigator();

function CustomDrawer(props: DrawerContentComponentProps) {

    const [isOpenUniv, setIsOpenUniv] = useState(false);
    const [isOpenArea, setIsOpenArea] = useState(false);
    const [isOpenLoc, setIsOpenLoc] = useState(false);

    const dropdownAniUniv = useRef(new Animated.Value(0)).current;
    const dropdownAniArea = useRef(new Animated.Value(0)).current;
    const dropdownAniLoc = useRef(new Animated.Value(0)).current;

    const [getTextUni, setTextUni] = useState('');
    const [getTextArea, setTextArea] = useState('');
    const [getTextLoc, setTextLoc] = useState('');

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

    const delete_univ_filter = (index: number) => {
        // Alterado para atualizar o estado
    };

    const delete_area_filter = (index: number) => {
        // Alterado para atualizar o estado
    };

    const delete_loc_filter = (index: number) => {
        // Alterado para atualizar o estado
    };

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Pressable onPress={toggleDropdownUniv} style={{ flexDirection: 'row' }}>
                    <Text>Universidade</Text>
                    <View style={{ width: 15 }}>
                        {!isOpenUniv ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={dir_seta_filtro} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={dir_seta_filtro} />}
                    </View>
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniUniv.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={dir_lupa} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextUni} value={getTextUni} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>

                <Pressable onPress={toggleDropdownArea} style={{ flexDirection: 'row' }}>
                    <Text>Área</Text>
                    {!isOpenArea ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={dir_seta_filtro} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={dir_seta_filtro} />}
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniArea.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={dir_lupa} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextArea} value={getTextArea} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>

                <Pressable onPress={toggleDropdownLoc} style={{ flexDirection: 'row' }}>
                    <Text>Localidade</Text>
                    {!isOpenLoc ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={dir_seta_filtro} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={dir_seta_filtro} />}
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniLoc.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={dir_lupa} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextLoc} value={getTextLoc} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>
                <Pressable onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
                    <Image source={dir_seta_volta} />
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
}

function Teste() {
    return <View />;
}

function FilterDrawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
                <Drawer.Screen name="Teste" component={Teste} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export function Pesquisar({ navigation }: { navigation: any; university: university }) {
    const [getText, setText] = useState('');
    const onChangeText = (search: string) => {
        setText(search);
    };

    const preresult = ['homi mata muie'];
    const result = ['noticia1'];
    const history = ['historico'];

    return (
        <>
            <Header />
            <Container style={styles.container1}>
                <View style={styles.container2}>
                    <Pressable onPress={() => { }}>
                        <Image source={dir_lupa} style={styles.impesqui} />
                        <TextInput
                            placeholder='pesquisar'
                            onChangeText={onChangeText}
                            value={getText}
                            style={styles.pesquisa}
                        />
                    </Pressable>
                    <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image style={styles.filtro} source={dir_filtro} />
                    </Pressable>
                </View>

                {preresult.length > 0 && (
                    <View>
                        {preresult.map((name, index) => (
                            <React.Fragment key={index}>
                                <Text onPress={() => { setText(name) }}>{name}</Text>
                                <View />
                            </React.Fragment>
                        ))}
                    </View>
                )}

                {history.length > 0 && (
                    <View>
                        {history.map((name, index) => (
                            <React.Fragment key={index}>
                                <Text onPress={() => { setText(name) }}>{name}</Text>
                                <View />
                            </React.Fragment>
                        ))}
                    </View>
                )}

                {result.length > 0 && (
                    <ScrollView>
                        {result.map((item, index) => (
                            <Text key={index}>Notícias aparecerão aqui</Text>
                        ))}
                    </ScrollView>
                )}
            </Container>
            <Footer />
        </>
    );
}
