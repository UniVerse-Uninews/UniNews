import React from 'react';
import { View, Pressable, Text, Image, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import { Container, Name, ImageCard, ContainerData, NameBlue } from '@theme/style';
import { styles } from '@styles/styleFeed';
import { NewsCardProps } from 'src/@types/interfaces';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';
import { useUniversityFollow } from '@hooks/useUniversityFollow';

const NewsCard: React.FC<NewsCardProps> = ({ news, savedNewsIds, handleSaveNews, handleRemoveNews }) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require('../../../assets/imagens/icon_salvos_cheio.png');
  const dir_unsave = require('../../../assets/imagens/icon_salvos_cheio.png');
  const dir_mais = require('../../../assets/imagens/add_button.png');

  return (
    <Container style={styles.container}>
      {news.map((item: any) => (
        
        <Pressable key={item.link} onPress={() => Linking.openURL(item.link)}>
          <View style={styles.viewCard}>
            <ContainerData style={styles.card}>
              {item.image ? (
                <ImageCard source={ item.image } style={styles.imageCard} />
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
                      source={ savedNewsIds.has(item.link) ? dir_unsave : dir_save }
                      style={styles.saveIcon}
                    />
                  </Pressable>
                  <View style={styles.iconContainerUni}>
                  <Pressable
                    style={styles.profileImageContainer}
                    onPress={() => {
                      if (item.universityId) {
                        navigation.navigate('PerfilUniversidade', { universityId: item.universityId });
                      } else {
                        Alert.alert('Erro', 'Informações da universidade não disponíveis.');
                        console.log('Erro: universityId não encontrado para esta notícia.', item);
                      }
                    }}
                  >
                    <Image
                      source={ item.image }
                      style={styles.profileImage}
                    />
                  </Pressable>
                  <Pressable style={styles.profileImageContainer} >
                    <Image
                      source={ dir_mais }
                      style={styles.profileImageMais}
                    />
                  </Pressable>
                  </View>
                </View>

              <Name style={styles.title}>{item.title}</Name>

              <View style={styles.data}>
                <Name style={styles.text}>{item.description || ''}</Name>

                <Name style={styles.text}>
                  Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : 'N/A'}
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
