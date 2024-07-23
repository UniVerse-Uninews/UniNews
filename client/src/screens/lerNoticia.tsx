import { Header } from '@components/addHeader/header';
import React from 'react'; 
import { View, Text } from 'react-native';
import { Footer }from '../components/addFooter/footer';
import { temp_news } from 'src/@types/temp_news';
import { save_news } from 'src/@types/save_news';
import { format } from 'date-fns';
import { styles } from '../styles/lerNoticiaStyle';
import { Container, Name } from '@theme/style';

const dirIconArrow = require('../../assets/imagens/Arrow.png');
const dirIconNoSave = require('../../assets/imagens/icon_salvos_vazio.png');
const dirIconSave = require('../../assets/imagens/icon_salvos_cheio.png');
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
},];


export default function lerNoticia({navigation}:any, noticia:temp_news | save_news){

    return(
        <>
            <Header/>
            <Container style={styles.container}>
                <View style={styles.icons}>
                <Pressable style={styles.back}
                onPress={() => navigation.navigate('Feed')}
                    ><Image source={dirIconArrow}/>
                    </Pressable>
                    <View style={styles.containerIcon}>
                    <TouchableOpacity
                        style={styles.icon}
                    >
                        <Image source={dirIconNoSave} style={styles.icon} />
                    </TouchableOpacity>
                    </View> 
                </View>
                <ScrollView>
                {news?.map((t: any) => (
                    <View style={styles.card}>
                            {t.image != '' ? (<Image source={{ uri: t.image }} style={styles.imageCard} />) : (<Text></Text>)}
                            <Name style={styles.title}>{t.title}</Name>
                            <View style={styles.data}>
                                <Name style={styles.text}>{t.description || ''}</Name>
                                <Name style={styles.text}>Publicado em: {t.created ? format(new Date(t.created), 'dd/MM/yyyy HH:mm') : ''}</Name>
                                <Name style={styles.text}>Por: {t.author || ''}</Name>
                            </View>
                    </View>
            ))}
        </ScrollView>
               
            </Container>
        <Footer />
        </>
    );
}