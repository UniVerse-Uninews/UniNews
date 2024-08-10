import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Image, ScrollView, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import { styles } from '../styles/tempLerNoticia';
import { saveNews } from '../components/saveNews/SaveNews';
import { getNews } from '../components/getNews/GetNews';
import { temp_news } from '../@types/temp_news';
import { getRss } from '@components/getRss/GetRss';

export  function TempLerNoticia() {
    const [text, onChangeText] = useState('');
    const [news, setNews] = useState<temp_news[] | null>(null);

    const guardarDados = async () => {
        if (!text) {
            Alert.alert('Erro', 'Insira um link!');
            return;
        }

        // Adapte a lógica se necessário
        try {
            // Exemplo de salvar dados usando a função saveNews
            const data = await getRss(text); // Se necessário
            if (data) {
                await saveNews(data);
                Alert.alert('Sucesso', 'Dados salvos com sucesso!');
            } else {
                Alert.alert('Erro', 'Nenhum dado retornado para o link fornecido.');
            }
        } catch (e) {
            console.error('Erro ao salvar dados:', e);
            Alert.alert('Erro', 'Erro ao salvar dados.');
        }
    };

    const pegarDados = async () => {
        if (!text) {
            Alert.alert('Erro', 'Insira um texto!');
            return;
        }

        try {
            const data = await getNews(text);
            if (data) {
                setNews(data);
                Alert.alert('Sucesso', 'Dados recebidos!');
            } else {
                Alert.alert('Aviso', 'Sem dados recebidos para o texto fornecido.');
            }
        } catch (e) {
            console.error('Erro ao pegar notícias:', e);
            Alert.alert('Erro', 'Erro ao pegar notícias.');
        }
    };

    return (
        <ScrollView style={{ paddingTop: 15 }}>
            <View style={styles.view1}>
                <TextInput
                    style={styles.input}
                    value={text}
                    placeholder="Texto para buscar notícias"
                    onChangeText={onChangeText}
                />
            </View>

            <View style={styles.view2}>
                <Pressable onPress={pegarDados} style={styles.press}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Pesquisar</Text>
                </Pressable>
                <Pressable onPress={guardarDados} style={styles.press}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text>
                </Pressable>
                <Pressable onPress={() => setNews(null)} style={styles.press}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Limpar Notícias</Text>
                </Pressable>
                <Pressable onPress={() => onChangeText('')} style={styles.press}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Limpar Campo</Text>
                </Pressable>
            </View>

            {news && news.map((t: temp_news) => (
                <Pressable key={t?.id || 'default_key'} onPress={() => { Linking.openURL(t.url) }}>
                    <View style={styles.viewCard}>
                        <View style={styles.card}>
                            {t.image ? (
                                <Image source={{ uri: t.image }} style={styles.imageCard} />
                            ) : (
                                <Text>Imagem não disponível</Text>
                            )}
                            <Text style={styles.title}>{t.title}</Text>
                            <View style={styles.data}>
                                <Text style={styles.text}>{t.description || ''}</Text>
                                <Text style={styles.text}>Publicado em: {t.createdAt ? format(new Date(t.createdAt), 'dd/MM/yyyy HH:mm') : ''}</Text>
                                <Text style={styles.text}>Por: {t.author || ''}</Text>
                                <Text style={styles.text}>Link: {t.url || ''}</Text>
                                <Text style={styles.text}>ID: {t.id}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );
}
