import React, { useState } from 'react';
import { View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@styles/stylePesquisa';
import { Header } from '@components/addHeader/header';
import { BackgroundInput, Container, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import Drawer from './drawer';
import NewsCard from '@components/addNews/news';
import useNewsSearch from '@hooks/useSearch'; 
import { useSavedNews } from '@hooks/useSavedNews';

const dir_lupa = 'http://projetoscti.com.br/projetoscti27/uninews/img/lupa-icon-pesquisa.png';
const dir_filtro = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_filtro.png';

export function Pesquisar({ navigation }: { navigation: any }) {
    const {
        news,
        text,
        onChangeText,
        handleSearchClick,
        inputRef,
    } = useNewsSearch();

    const [savedNewsIds, setSavedNewsIds] = useState(new Set<string>());

    const { handleSaveNews, handleRemoveNews } = useSavedNews();
    

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
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
                            placeholder='Pesquisar'
                            onChangeText={onChangeText} 
                            value={text}
                            style={styles.pesquisa}
                        />
                        <TouchableOpacity onPress={handleSearchClick} style={styles.containerimpesqui}>
                            <Image source={{ uri: dir_lupa }} style={styles.impesqui} />
                        </TouchableOpacity>
                    </BackgroundInput>
                    <TouchableOpacity onPress={toggleDrawer}>
                        <View style={styles.contfiltro}>
                            <Image style={styles.filtro} source={{ uri: dir_filtro }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container3}>
                        <NewsCard
                    news={news}
                    savedNewsIds={savedNewsIds}
                    handleSaveNews={handleSaveNews}
                    handleRemoveNews={(link) => handleRemoveNews(link)}
                    />
                </ScrollView>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            </Container>
            <Footer />
        </>
    );
}
