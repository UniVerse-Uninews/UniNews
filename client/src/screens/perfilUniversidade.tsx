import React, { useState } from 'react';
import { styles } from '@styles/stylePerfilUniversidade';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, Image } from 'react-native';
import { News } from '@components/addNews/news';
import { ScrollView } from 'react-native';
import {university} from '../@types/university';

export function perfilUniversidade({ navigation }: any, university:university) {

    return (
        <>
            <Header/>
            <Container style={styles.container1}>
                <ScrollView>
                    <View style={styles.container2}>
                        <View style={styles.container3}>
                            <Text>{university.name}</Text>
                            <View style={styles.description}><Text>{university.description}</Text></View>
                        </View>
                        <View style={styles.image}><Image source={{uri: university.image}}/></View>
                    </View>
                    <View>Notícias recentes</View>
                    <News universityId={university.id}/>
                </ScrollView>
            </Container>
            <Footer/>
        </>
    );
}
