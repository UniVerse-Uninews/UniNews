import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import { Container, Name, ContainerCabecalho, BorderColorButton } from '@theme/style';
import { styles } from '@styles/styleFeed';
import { NewsCardProps } from 'src/@types/interfaces';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';
import { getUniversity } from '@services/api';
import { useUniversityFollow } from '@hooks/useUniversityFollow';

const NewsCard: React.FC<NewsCardProps> = ({ news, savedNewsIds, handleSaveNews, handleRemoveNews }) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require('../../../assets/imagens/bookmark_border.png');
  const dir_unsave = require('../../../assets/imagens/bookmark.png');
  const dir_follow = require('../../../assets/imagens/control_point.png');
  const dir_unfollow = require('../../../assets/imagens/dangerous.png');

  const [universityNames, setUniversityNames] = useState<{ [key: string]: string }>({});

  // Fetch and set the university names for each news item
  useFocusEffect(
    React.useCallback(() => {
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
    }, [news])
  );

  return (
    <Container style={styles.container}>
      {news.map((item: any) => {
        const { isFollowing, handleFollowUniversity, handleUnfollowUniversity } = useUniversityFollow(item.universityId);

        // Handle follow/unfollow for a specific university
        const toggleFollow = async () => {
          if (isFollowing) {
            await handleUnfollowUniversity();
          } else {
            await handleFollowUniversity();
          }
        };

        return (
          <Pressable key={item.link} onPress={() => Linking.openURL(item.link)}>
            <View style={styles.viewCard}>
              <ContainerCabecalho style={styles.card}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.imageCard} />
                ) : (
                  <Name>Image not available</Name>
                )}

                <View style={styles.iconContainer}>
                  {/* Save/Unsave News */}
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
                          navigation.navigate('PerfilUniversidade', { universityId: item.universityId });
                        }}
                      >
                        <Name numberOfLines={2} style={styles.textUni}>
                          {universityNames[item.universityId]}
                        </Name>
                      </BorderColorButton>
                    ) : (
                      <Name numberOfLines={2} style={styles.textUni}>Universidade não disponível</Name>
                    )}

                    {/* Follow/Unfollow button for the university */}
                    <Pressable
                      style={styles.profileImageContainer}
                      onPress={toggleFollow}
                    >
                      <View style={styles.contImgMais}>
                        <Image
                          source={isFollowing ? dir_unfollow : dir_follow}
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
        );
      })}
    </Container>
  );
};

export default NewsCard;
