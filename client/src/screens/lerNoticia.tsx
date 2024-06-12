import { Header } from '@components/addHeader/header';
import React from 'react'; 
import { View, Text } from 'react-native';
import {Footer}from '../components/addFooter/footer';
import { temp_news } from 'src/@types/temp_news';
import { save_news } from 'src/@types/save_news';
import { format } from 'date-fns';

export default function lerNoticia({navigation}:any, noticia:temp_news | save_news){

    return(
        <>
            <Header/>
            <View>
                <Text>titulo {noticia?.title}</Text>
                <Text>autor {noticia?.author || ''}</Text>
                <Text>data de publicacao {noticia.created ? format(new Date(noticia.created), 'dd/MM/yyyy HH:mm') : ''}</Text>
                <Text>conteudo {noticia?.content || ''}</Text>
            </View>
        <Footer />
        </>
    );
}