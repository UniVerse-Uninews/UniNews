import React, { useState, useEffect } from 'react';
import { Text, View, Linking, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { styles } from './newsStyle';
import { BorderColorBlue, Name } from '@theme/style';
import { fetchNewsByUniversity } from '@services/api';
import { temp_news } from '../../@types/temp_news';

const dirIconNoSave = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_vazio.png';
const dirIconSave = 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_salvos_cheio.png';

interface NewsProps {
  universityId: string;
  universityImage: string; 
}

export function News({ universityId, universityImage }: NewsProps) {
  const [news, setNews] = useState<temp_news[]>([]);
  const [iconSaved, setIconSaved] = useState<{ [key: string]: boolean }>({});

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

  const handlePress = (newsId: string) => {
    setIconSaved(prevState => ({ ...prevState, [newsId]: !prevState[newsId] }));
  };

  const handlePressablePress = (url?: string) => {
    if (url && typeof url === 'string') {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    } else {
      console.warn('URL is invalid:', url);
    }
  };

  return (
    <ScrollView>
      {news.length > 0 ? (
        news.map((item) => (
          <View key={item.id} style={styles.card}>
            <BorderColorBlue>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.imageCard} />
              ) : (
                <Image source={{ uri: universityImage }} style={styles.imageCard} />
              )}
              <View style={styles.containerIcon}>
                <TouchableOpacity onPress={() => handlePress(item.id)}>
                  <Image
                    source={{ uri: iconSaved[item.id] ? dirIconSave : dirIconNoSave }}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.data}>
                <Name style={styles.title}>{item.title}</Name>
                <Name style={styles.text}>{item.description}</Name>
                <Pressable onPress={() => handlePressablePress(item.url)}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    Read More
                  </Text>
                </Pressable>
                <Name style={styles.text}>
                    Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : ''}
                  </Name>
              </View>
            </BorderColorBlue>
          </View>
        ))
      ) : (
        <Text>No news available</Text>
      )}
    </ScrollView>
  );
}
