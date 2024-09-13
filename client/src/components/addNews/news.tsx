import React from 'react';
import { View, Pressable, Text, Image, Linking } from 'react-native';
import { format } from 'date-fns';
import { Container, Name, ImageCard, ContainerData, NameBlue } from '@theme/style';
import { styles } from '@styles/styleFeed';
import { NewsCardProps } from 'src/@types/interfaces';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'src/@types/navigation-params';

const NewsCard: React.FC<NewsCardProps> = ({ news, savedNewsIds, handleSaveNews, handleRemoveNews }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container style={styles.container}>
      {news.map((item) => (
        <View key={item.link} style={styles.viewCard}>
          <ContainerData style={styles.card}>
            {item.image ? (
              <ImageCard source={{ uri: item.image }} style={styles.imageCard} />
            ) : (
              <Name>Image not available</Name>
            )}

            <Pressable onPress={() => {}}>
              <NameBlue style={styles.title}>{item.title}</NameBlue>
            </Pressable>

            <View style={styles.data}>
              <Name style={styles.text}>{item.description || ''}</Name>

              <Pressable onPress={() => Linking.openURL(item.link)}>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Read More</Text>
              </Pressable>

              <Name style={styles.text}>
                Published on: {item.published ? format(new Date(item.published), 'dd/MM/yyyy HH:mm') : 'N/A'}
              </Name>


              <Pressable
                onPress={() => savedNewsIds.has(item.link) ? handleRemoveNews(item.link) : handleSaveNews(item)}
              >
                <Text style={{ color: savedNewsIds.has(item.link) ? 'green' : 'blue', textDecorationLine: 'underline' }}>
                  {savedNewsIds.has(item.link) ? 'Saved' : 'Save News'}
                </Text>
              </Pressable>

              {savedNewsIds.has(item.link) && (
                <Pressable onPress={() => handleRemoveNews(item.link)}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios/452/delete-sign.png' }}
                    style={styles.saveIcon}
                  />
                </Pressable>
              )}
               <Pressable
              style={styles.profileImageContainer}
              onPress={() => navigation.navigate('PerfilUniversidade', { universityId: item.universityId })}
            >
              <Image
                source={{ uri: 'http://projetoscti.com.br/projetoscti27/uninews/img/icon_logout.png' }} 
                style={styles.profileImage}
              />
              </Pressable>
            </View>
          </ContainerData>
        </View>
      ))}
    </Container>
  );
};

export default NewsCard;
