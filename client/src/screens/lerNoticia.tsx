import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header } from '@components/addHeader/header';
import { Footer } from '../components/addFooter/footer';
import { styles } from '../styles/lerNoticiaStyle';
import { Container, Name, NameBlue } from '@theme/style';
import { format } from 'date-fns';

export function LerNoticia({ route }: any) {
    const { noticia } = route.params; // Access the passed news item

    return (
        <>
            <Header />
            <Container style={styles.container}>
                <ScrollView>
                    <View style={styles.card}>
                        {noticia.image ? (
                            <Image source={{ uri: noticia.image }} style={styles.imageCard} />
                        ) : (
                            <Text>Image not available</Text>
                        )}
                        <NameBlue style={styles.title}>{noticia.title}</NameBlue>
                        <View style={styles.infos}>
                            <NameBlue style={styles.text}>Por: {noticia.author || ''}</NameBlue>
                            <NameBlue style={styles.text}>Publicado em: {noticia.published ? format(new Date(noticia.published), 'dd/MM/yyyy HH:mm') : ''}</NameBlue>
                        </View>
                        <View style={styles.data}>
                            <Name style={styles.text}>{noticia.description || ''}</Name>
                        </View>
                    </View>
                </ScrollView>
            </Container>
            <Footer />
        </>
    );
}
