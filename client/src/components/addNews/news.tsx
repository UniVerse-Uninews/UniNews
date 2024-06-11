import React from 'react';
import { Text, View, Linking, Pressable, Image, ScrollView } from 'react-native';
import { save_news } from 'src/@types/save_news';
import { temp_news } from 'src/@types/temp_news';
import { format } from 'date-fns';
import { styles } from './newsStyle';
import { BorderColorBlue, Name } from '@theme/style';

const dir = require('../../../assets/imagens/icon_salvos_vazio.png');

export function News(/*news: save_news[] | temp_news[]*/) {
    const news = [{
        id: 'teste',
        title: 'teste',
        description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste',
        image: 'teste',
        link: 'teste',
        category: 'teste',
        content: 'teste',
        author: 'teste',
        created: new Date(1717770284),
        university: 'teste'
    },{
        id: 'teste1',
        title: 'teste',
        description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste',
        image: 'teste',
        link: 'teste',
        category: 'teste',
        content: 'teste',
        author: 'teste',
        created: new Date(1717770284),
        university: 'teste'
    }];
    return (
        <ScrollView>
            {news?.map((t: any) => (
                <Pressable key={t?.id || ''} onPress={() => { Linking.openURL(t.link) }}>
                    <View>
                        <BorderColorBlue style={styles.card}>
                            <View style={styles.containerIcon}>
                                    <Pressable><Image source={dir} style={styles.icon}/></Pressable>
                                    </View> 
                            {t.image != '' ? (<Image source={{ uri: t.image }} style={styles.imageCard} />) : (<Text></Text>)}
                            <Name style={styles.title}>{t.title}</Name>
                            <View style={styles.data}>
                                <Name style={styles.text}>{t.description || ''}</Name>
                                <Name style={styles.text}>Publicado em: {t.created ? format(new Date(t.created), 'dd/MM/yyyy HH:mm') : ''}</Name>
                                <Name style={styles.text}>Por: {t.author || ''}</Name>
                            </View>
                        </BorderColorBlue>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}