import React from 'react';
import { Text, View, Linking, Pressable, Image, ScrollView } from 'react-native';
import { news } from 'src/@types/news';
import { temp_news } from 'src/@types/temp_news';
import { format } from 'date-fns';
import { styles } from './newsStyle';

const dir = require("../../../assets/imagens/icon_salvos_vazio.png");

export function News(/*news: news[] | temp_news[]*/) {
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
                    <View style={styles.viewCard}>
                        <View style={styles.card}>
                            {t.image != '' ? (<Image source={{ uri: t.image }} style={styles.imageCard} />) : (<Text></Text>)}
                            <Text style={styles.title}>{t.title}</Text>
                            <View style={styles.data}>
                                <Text style={styles.text}>{t.description || ''}</Text>
                                <Text style={styles.text}>Publicado em: {t.created ? format(new Date(t.created), 'dd/MM/yyyy HH:mm') : ''}</Text>
                                <Text style={styles.text}>Por: {t.author || ''}</Text>

                                <Pressable><Image source={dir} style={styles.icon}/></Pressable>
                            </View>
                        </View>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}