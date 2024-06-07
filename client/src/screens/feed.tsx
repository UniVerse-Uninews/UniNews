import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import React from 'react'; 
import { styles } from '@styles/styleFeed';
import { View } from 'react-native';
import { ThemeNews } from '../components/addTheme/theme';
import { News } from '@components/addNews/news';
import {Footer}from '../components/addFooter/footer';

export function Feed({ navigation }: any) {
    return (
        <>
            <Header/>
                <Container style={styles.container}>
                    <View style={styles.box}>
                        <ThemeNews name="Biológicas" />
                        <ThemeNews name="Exatas" />
                        <ThemeNews name="Humanas" />
                        <ThemeNews name="Linguagens" />
                        <ThemeNews name="Tecnologia" />
                    </View>
                </Container>
            <News/>
            <Footer/>
        </>
    );
}