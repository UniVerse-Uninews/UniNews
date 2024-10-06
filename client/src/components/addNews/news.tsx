import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import { Container, Name, ImageCard, ContainerData, ContainerCabecalho, NameBlue, BorderColorBackground, BorderColorButton } from '@theme/style';
import { styles } from '@styles/styleFeed';
import { NewsCardProps } from 'src/@types/interfaces';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';
import { getUniversity } from '@services/api';

const NewsCard: React.FC<NewsCardProps> = ({ news, savedNewsIds, handleSaveNews, handleRemoveNews }) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require('../../../assets/imagens/bookmark_border.png');
  const dir_unsave = require('../../../assets/imagens/bookmark.png');
  const dir_follow = require('../../../assets/imagens/control_point.png');
  const dir_unfollow = require('../../../assets/imagens/dangerous.png');

  const [universityNames, setUniversityNames] = useState<{ [key: string]: string }>({});
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAllUniversityNames = async () => {
      const universityIds = news.map((item: any) => item.universityId).filter(Boolean);
      const uniqueUniversityIds = [...new Set(universityIds)];

      const names = await Promise.all(
        uniqueUniversityIds.map(async (id) => {
          const university = await getUniversity(String(id));
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
            <ContainerCabecalho style={styles.card}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.imageCard} />
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

                    <BorderColorButton
                    style={styles.profileNameContainer}
                      onPress={() => {
                        if (item.universityId) {
                          navigation.navigate('PerfilUniversidade', { universityId: item.universityId });
                        } else {
                          Alert.alert('Erro', 'Informações da universidade não disponíveis.');
                        }
                      }}
                    >
                      <Name numberOfLines={2} style={styles.textUni}>{universityNames[item.universityId]}</Name>
                    </BorderColorButton>
                  ) : (
                    <Name numberOfLines={2} style={styles.textUni}>Universidade não disponível</Name>
                  )}

                  <Pressable style={styles.profileImageContainer} onPress={() => 
                    isFollowing ? setIsFollowing(false) : setIsFollowing(true)
                  }>
                    <View style={styles.contImgMais}>
                    <Image
                      source={ isFollowing ? dir_unfollow : dir_follow}
                      style={styles.profileImageMais}
                    />
                    </View>
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
            </ContainerCabecalho>
          </View>
        </Pressable>
      ))}
    </Container>
  );
};

export default NewsCard;
