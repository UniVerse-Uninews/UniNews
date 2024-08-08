import React from 'react';
import { styles } from '@styles/stylePerfilUniversidade';
import { Header } from '@components/addHeader/header';
import { BorderColorContainer, Container, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, Text, Image } from 'react-native';
import { News } from '@components/addNews/news';
import { ScrollView } from 'react-native';
import {university} from '../@types/university';


export function PerfilUniversidade({ navigation }: any, university:university) {

    return (
        <>
            <Header/>
            <Container style={styles.container1}>
                <ScrollView>
                    <View style={styles.container2}>
                        <View style={styles.container3}>
                            <NameBlue style={styles.name}>{university.name}</NameBlue>
                            <BorderColorContainer style={styles.description1}><Text>{university.description}</Text></BorderColorContainer>
                        </View>
                        <View style={styles.image}><Image source={{uri: university.image}} style={styles.image1}/></View>
                    </View>
                    <View style={styles.container4}>
                    <BorderColorContainer style={styles.news}><NameBlue style={styles.name1}>NOTÍCIAS RECENTES</NameBlue></BorderColorContainer>
                    </View>
                    <News universityId={university.id}/>
                </ScrollView>
            </Container>
            <Footer/>
        </>
    );
}
