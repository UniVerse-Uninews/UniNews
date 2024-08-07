import React, { useState, useEffect } from 'react';
import { Text, View, Linking, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { styles } from './newsStyle';
import { BorderColorBlue, Name } from '@theme/style';
import { fetchNewsByUniversity } from '@services/api';
import { temp_news } from '../../@types/temp_news';


const dirIconNoSave = require('../../../assets/imagens/icon_salvos_vazio.png');
const dirIconSave = require('../../../assets/imagens/icon_salvos_cheio.png');
interface NewsProps {
  universityId: string;
}

export function News({ universityId }: NewsProps) {
  const [news, setNews] = useState<temp_news[]>([]);

  useEffect(() => {
    async function getNews() {
      try {
        const newsItems = await fetchNewsByUniversity(universityId);
        setNews(newsItems);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    getNews();
  }, [universityId]);
  const [iconSaved, setIconSaved] = useState(false);

  const handlePress = () => {
      setIconSaved(!iconSaved);
  };
  return (
    <ScrollView>
      {news.map(t => (
        <Pressable key={t.id} onPress={() => Linking.openURL(t.url)}>
          <View>
            <BorderColorBlue style={styles.card}>
              <View style={styles.containerIcon}>
                        <TouchableOpacity style={styles.icon} onPress={handlePress}>
                            <Image 
                                source={iconSaved ? dirIconSave : dirIconNoSave} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    </View>
              {t.image ? (<Image source={{ uri: t.image }} style={styles.imageCard} />) : (<Text></Text>)}
              <Name style={styles.title}>{t.title}</Name>
              <View style={styles.data}>
                <Name style={styles.text}>{t.description}</Name>
                <Name style={styles.text}>Publicado em: {t.createdAt ? format(new Date(t.createdAt), 'dd/MM/yyyy HH:mm') : ''}</Name>
                <Name style={styles.text}>Por: {t.author}</Name>
              </View>
            </BorderColorBlue>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}