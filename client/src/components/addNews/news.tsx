import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import { Container, Name, ImageCard, ContainerData } from '@theme/style';
import { styles } from '@styles/styleFeed';
import { NewsCardProps } from 'src/@types/interfaces';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';
import { getUniversity } from '@services/api';

const NewsCard: React.FC<NewsCardProps> = ({ news, savedNewsIds, handleSaveNews, handleRemoveNews }) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require('../../../assets/imagens/icon_salvos_vazio.png');
  const dir_unsave = require('../../../assets/imagens/icon_salvos_cheio.png');
  const dir_mais = require('../../../assets/imagens/add_button.png');

  const [universityNames, setUniversityNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAllUniversityNames = async () => {
      const universityIds = news.map((item: any) => item.universityId).filter(Boolean);
      const uniqueUniversityIds = [...new Set(universityIds)];

      const names = await Promise.all(
        uniqueUniversityIds.map(async (id) => {
          const university = await getUniversity(String(id));
          console.log('Fetched university:', university); // Log para verificar o retorno
          return { id, name: university?.university?.name || 'Nome não disponível' };
        })
      );

      const universityNamesMap = names.reduce((acc, { id, name }: any) => {
        acc[id] = name;
        return acc;
      }, {} as { [key: string]: string });

      setUniversityNames(universityNamesMap);
    };

    fetchAllUniversityNames();
  }, [news]);

  return (
    <Container style={styles.container}>
      {news.map((item: any) => (
        <Pressable key={item.link} onPress={() => Linking.openURL(item.link)}>
          <View style={styles.viewCard}>
            <ContainerData style={styles.card}>
              {item.image ? (
                <ImageCard source={{ uri: item.image }} style={styles.imageCard} />
              ) : (
                <Name>Image not available</Name>
              )}

              <View style={styles.iconContainer}>
                <Pressable
                  onPress={() =>
                    savedNewsIds.has(item.link)
                      ? handleRemoveNews(item.link)
                      : handleSaveNews(item)
                  }
                >
                  <Image
                    source={savedNewsIds.has(item.link) ? dir_unsave : dir_save}
                    style={styles.saveIcon}
                  />
                </Pressable>

                <View style={styles.iconContainerUni}>
                  {item.universityId && universityNames[item.universityId] ? (
                    <Pressable
                      onPress={() => {
                        if (item.universityId) {
                          navigation.navigate('PerfilUniversidade', { universityId: item.universityId });
                        } else {
                          Alert.alert('Erro', 'Informações da universidade não disponíveis.');
                        }
                      }}
                    >
                      <Name style={styles.text}>{universityNames[item.universityId]}</Name>
                    </Pressable>
                  ) : (
                    <Name style={styles.text}>Universidade não disponível</Name>
                  )}

                  <Pressable style={styles.profileImageContainer}>
                    <Image
                      source={dir_mais}
                      style={styles.profileImageMais}
                    />
                  </Pressable>
                </View>
              </View>

              <Name style={styles.title}>{item.title}</Name>

              <View style={styles.data}>
                <Name style={styles.text}>{item.description || ''}</Name>
                <Name style={styles.text}>
                  Publicado em: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : 'N/A'}
                </Name>
              </View>
            </ContainerData>
          </View>
        </Pressable>
      ))}
    </Container>
  );
};

export default NewsCard;
