import { Header } from '@components/addHeader/header';
import React, { useState } from 'react'; 
import { View, Text, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Footer } from '../components/addFooter/footer';
import { temp_news } from 'src/@types/temp_news';
import { save_news } from 'src/@types/save_news';
import { format } from 'date-fns';
import { styles } from '../styles/lerNoticiaStyle';
import { Container, Name, NameBlue } from '@theme/style';

const news = [{
    id: 'teste',
    title: 'teste',
    description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste',
    image: 'https://picsum.photos/id/237/200/300',
    link: 'teste',
    category: 'teste',
    content: 'teste',
    author: 'teste',
    created: new Date(1717770284),
    university: 'teste'
}];

const dirIconArrow = require('../../assets/imagens/Arrow.png');
const dirIconNoSave = require('../../assets/imagens/icon_salvos_vazio.png');
const dirIconSave = require('../../assets/imagens/icon_salvos_cheio.png');



export  function LerNoticia({ navigation }: any, noticia: temp_news | save_news) {
    const [iconSaved, setIconSaved] = useState(false);

    const handlePress = () => {
        setIconSaved(!iconSaved);
    };

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <View style={styles.icons}>
                    <Pressable style={styles.back} onPress={() => navigation.navigate('Feed')}>
                        <Image source={dirIconArrow} />
                    </Pressable>
                    <View style={styles.containerIcon}>
                        <TouchableOpacity style={styles.icon} onPress={handlePress}>
                            <Image 
                                source={iconSaved ? dirIconSave : dirIconNoSave} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {news?.map((t: any) => (
                        <View style={styles.card} key={t.id}>
                            {t.image !== '' ? (
                                <Image source={{ uri: t.image }} style={styles.imageCard} />
                            ) : (
                                <Text></Text>
                            )}
                            <NameBlue style={styles.title}>{t.title}</NameBlue>
                            <View style={styles.infos}>
                                <NameBlue style={styles.text}>Por: {t.author || ''}</NameBlue>
                                <NameBlue style={styles.text}>Publicado em: {t.created ? format(new Date(t.created), 'dd/MM/yyyy HH:mm') : ''}</NameBlue>
                            </View>
                            <View style={styles.data}>
                                <Name style={styles.text}>{t.description || ''}</Name>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
