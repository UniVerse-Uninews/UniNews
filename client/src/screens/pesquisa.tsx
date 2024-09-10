
import React, { useRef, useState, useEffect } from 'react';
import { styles } from '@styles/stylePesquisa';
import { Header } from '@components/addHeader/header';
import { BackgroundInput, BackgroundInputText, Container, ContainerData, ImageCard, Name, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, TextInput, Image, ScrollView, Pressable, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Linking, SafeAreaView } from 'react-native';
import { university } from '../@types/university';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import Drawer from './drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import { format } from 'date-fns';
import { useAuth } from 'src/context/authContext';
import { useFocusEffect } from 'expo-router';



const dir_lupa ='http://projetoscti.com.br/projetoscti27/uninews/img/lupa-icon-pesquisa.png';
const dir_filtro = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_filtro.png';
const dir_seta_filtro = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_setinha_filtro.png';
const dir_seta_volta = 'http://projetoscti.com.br/projetoscti27/uninews/img/Arrow.png';


//const Drawer = createDrawerNavigator();
const BASE_URL = REACT_APP_API_URL;
export interface SearchResults {
    title: string;
    content: string;
    date: string;
}


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

    // const delete_univ_filter = (index: number) => {
    //     // Alterado para atualizar o estado
    // };

    // const delete_area_filter = (index: number) => {
    //     // Alterado para atualizar o estado
    // };

    // const delete_loc_filter = (index: number) => {
    //     // Alterado para atualizar o estado
    // };

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Pressable onPress={toggleDropdownUniv} style={{ flexDirection: 'row' }}>
                    <Text>Universidade</Text>
                    <View style={{ width: 15 }}>
                        {!isOpenUniv ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={{uri: dir_seta_filtro}} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={{uri: dir_seta_filtro}} />}
                    </View>
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniUniv.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={{uri: dir_lupa}} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextUni} value={getTextUni} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>

                <Pressable onPress={toggleDropdownArea} style={{ flexDirection: 'row' }}>
                    <Text>Área</Text>
                    {!isOpenArea ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={{uri: dir_seta_filtro}} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={{uri: dir_seta_filtro}} />}
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniArea.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={{uri: dir_lupa}} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextArea} value={getTextArea} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>

                <Pressable onPress={toggleDropdownLoc} style={{ flexDirection: 'row' }}>
                    <Text>Localidade</Text>
                    {!isOpenLoc ? <Image style={{ width: 15, transform: [{ rotateX: '0deg' }] }} source={{uri: dir_seta_filtro}} /> : <Image style={{ width: 15, transform: [{ rotateX: '90deg' }] }} source={{uri: dir_seta_filtro}} />}
                </Pressable>
                <Animated.View style={[styles.dropdown, {
                    height: dropdownAniLoc.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 150],
                    })
                }]}>
                    <Pressable onPress={() => { }}>
                        <Image source={{uri: dir_lupa}} />
                        <TextInput style={styles.pesquisa} placeholder="pesquisar" onChangeText={setTextLoc} value={getTextLoc} />
                    </Pressable>
                    {/* Lista de filtros */}
                </Animated.View>
                <Pressable onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
                    <Image source={{uri: dir_seta_volta}} />
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
}

function Teste() {
    return <View />;
}
/*
function FilterDrawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
                <Drawer.Screen name="Teste" component={Teste} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}*/

export function Pesquisar({ navigation }: { navigation: any; university: university }) {
    const [getText, setText] = useState('');
    const onChangeText = (search: string) => {
        setText(search);
    };
    const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
    const { user } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

 
    const preresult = ['homi mata muie'];
    const result = ['noticia1'];
    const history = ['historico'];

    const [universityName, setUniversityName] = useState('');
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchNews = async (url: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/npm/${encodeURIComponent(url)}`);
            return response.data.items;
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
            return [];
        }
    };

    const fetchUniversityUrls = async (name: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/university/name/${encodeURIComponent(name)}`);
            if (response.data && response.data.length > 0) {
                return response.data.map((university: { url: string }) => university.url);
            } else {
                Alert.alert('Erro', 'Nenhuma universidade encontrada.');
                return [];
            }
        } catch (error) {
            console.error('Error fetching university URLs:', error);
            Alert.alert('Erro', 'Erro ao buscar URLs das universidades.');
            return [];
        }
    };
    const handleUniversityNameChange = debounce(async (name: string) => {
        try {
            if (!name.trim()) {
                setNews([]);
                return;
            }
            setLoading(true);
    
            // Obtenha as URLs das universidades com base no nome
            const universityUrls = await fetchUniversityUrls(name);
    
            if (universityUrls.length > 0) {
                // Busque as notícias usando as URLs das universidades
                const newsPromises = universityUrls.map((url: string) => fetchNews(url));
                const newsResults = await Promise.all(newsPromises);
                const allNews = newsResults.flat();
                setNews(allNews);
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            Alert.alert('Erro', 'Erro ao buscar notícias.');
        } finally {
            setLoading(false);
        }
    }, 500);

    const handleSaveNews = async (news: any) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para salvar uma notícia.');
            return;
        }
    
        if (!news.link) {
            console.error('News link is missing');
            Alert.alert('Erro', 'Link da notícia está ausente.');
            return;
        }

        if (savedNewsIds.has(news.link)) {
            Alert.alert('Erro', 'Esta notícia já foi salva.');
            return;
        }
    
        const newsData = {
            link: news.link, 
            title: news.title || '',
            description: news.description || '',
            image: news.image || '',
            author: news.author || '',
            published: news.published || new Date(),
            created: news.created || new Date(),
            category: news.category || [],
            enclosures: news.enclosures || [],
            media: news.media || {}
        };
    
        try {
            console.log('Sending data:', {
                userId: user.id,
                news: newsData
            });
    
            const response = await axios.post(`${BASE_URL}/save-news`, {
                userId: user.id,
                news: newsData
            });
    
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Notícia salva com sucesso.');
                setSavedNewsIds((prevIds) => new Set([...prevIds, news.link]));
            } else {
                console.error('Error saving news:', response.data);
                Alert.alert('Erro', 'Erro ao salvar notícia.');
            }
        } catch (error) {
            console.error('Error saving news:', error);
            Alert.alert('Erro', 'Erro ao salvar notícia.');
        }
    };
    const handleRemoveNews = async (news: any) => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para remover uma notícia.');
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}/remove-news`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    newsUrl: news.link,  // Use 'news.link' aqui
                }),
            });
    
            console.log('response:', news.link);
    
            if (response.ok) {
                Alert.alert('Sucesso', 'Notícia removida com sucesso.');
    
                setSavedNewsIds((prevIds) => {
                    const updatedIds = new Set(prevIds);
                    updatedIds.delete(news.link);
                    return updatedIds;
                });
            } else {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.error || 'Erro ao remover notícia.');
            }
        } catch (error) {
            console.error('Error removing news:', error);
            Alert.alert('Erro', 'Erro ao remover notícia.');
        }
    };

    const inputRef = useRef<TextInput>(null); // Cria uma referência para o TextInput


    const handlePress = () => {
        // Foca o TextInput quando TouchableOpacity é pressionado
        if (inputRef.current) {
            inputRef.current.focus(); // O método focus() deve estar disponível
        }
    };

    
    return (
        <>
            <Header />
            <Container style={styles.container1}>
            
                <NameBlue style={styles.title1}>EXPLORAR</NameBlue>
                <View style={styles.container2}>
                <BackgroundInput style={styles.inputArea}>
                        <TextInput
                        ref={inputRef}
                        placeholderTextColor={'#8F8F8F'}
                        placeholder='pesquisar'
                        onChangeText={(text)=>
                        {
                            setUniversityName(text);
                            handleUniversityNameChange(text);}
                        }
                        autoFocus
                        value={universityName}
                        style={styles.pesquisa}
                        />
                        <TouchableOpacity onPress={handlePress} style={styles.containerimpesqui}>
                            <Image source={{uri: dir_lupa}} style={styles.impesqui} />
                        </TouchableOpacity>
                    </BackgroundInput>
                    <TouchableOpacity onPress={toggleDrawer} >
                        <View style={styles.contfiltro}>
                        <Image style={styles.filtro} source={{uri: dir_filtro}} />
                        </View>
                    </TouchableOpacity>

                </View>
                
                <ScrollView style={styles.container3}>
                {news.map((item, index) => (

                <View key={item.link || index} style={styles.viewCard}>
                            <ContainerData style={styles.card}>
                                {item.image ? (
                                    <ImageCard source={{ uri: item.image }} style={styles.imageCard} />
                                ) : (
                                    <Name>Image not available</Name>
                                )}
                                <Pressable onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}>
                                    <NameBlue style={styles.title}>{item.title}</NameBlue>
                                </Pressable>
                                <View style={styles.data}>
                                    <Name style={styles.text}>{item.description || ''}</Name>
                                    <Pressable onPress={() => Linking.openURL(item.link)}>
                                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                                            Read More
                                        </Text>
                                    </Pressable>
                                    <Name style={styles.text}>
                                        Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : ''}
                                    </Name>
                                    <Pressable onPress={() => handleSaveNews(item)}>
                                        <Pressable onPress={() => handleSaveNews(item)}>
                                                <Text style={{ color: savedNewsIds.has(item.link) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                                                    {savedNewsIds.has(item.link) ? 'Saved' : 'Save News'}
                                                </Text>
                                                    {savedNewsIds.has(item.link) && (
                                                <Text style={{ color: 'red' }}>You have already saved this news.</Text>
                                    )}
                                </Pressable>
                                    </Pressable>
                                    <Pressable onPress={() => savedNewsIds.has(item.link) ? handleRemoveNews(item.link) : handleSaveNews(item)}>
                                                                        {savedNewsIds.has(item.link) && (
                                            <>
                                                <Pressable onPress={() => handleRemoveNews(item)}>
                                                    <Image
                                                        source={{ uri: 'https://img.icons8.com/ios/452/delete-sign.png' }}
                                                        style={styles.saveIcon}
                                                    />
                                                </Pressable>
                                            </>
                                        )}
                                    </Pressable>

                                </View>
                            </ContainerData>
                        </View>
                ))}
                {/*{preresult.length > 0 && (
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
                )}*/}
                </ScrollView>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

            </Container>
            <Footer />

        </>

    );

}

