import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Linking } from "react-native";
import { format } from "date-fns";
import { Container, Name, ContainerCabecalho } from "@theme/style";
import { styles } from "@styles/styleFeed";
import { NewsCardProps } from "src/@types/interfaces";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "src/@types/navigation-params";

const NewsCardSearch: React.FC<NewsCardProps> = ({
  news,
  savedNewsIds,
  handleSaveNews,
  handleRemoveNews,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require("../../../assets/imagens/bookmark_border.png");
  const dir_unsave = require("../../../assets/imagens/bookmark.png");

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
                {/* Save/Unsave News */}
                <Pressable
                  onPress={() => {
                    if (item.link) {
                      savedNewsIds.has(item.link)
                        ? handleRemoveNews(item)
                        : handleSaveNews(item);
                    } else {
                      console.error("Invalid news link for removal:", item);
                    }
                  }}
                >
                  <Image
                    source={savedNewsIds.has(item.link) ? dir_unsave : dir_save}
                    style={styles.saveIcon}
                  />
                </Pressable>
              </View>

              <Name style={styles.title}>{item.title}</Name>

              <View style={styles.data}>
                <Name style={styles.text}>{item.description || ""}</Name>
                <Name style={styles.text}>
                  Publicado em:{" "}
                  {item.published
                    ? format(new Date(item.published), "dd/MM/yyyy HH:mm")
                    : "N/A"}
                </Name>
              </View>
            </ContainerCabecalho>
          </View>
        </Pressable>
      ))}
    </Container>
  );
};

export default NewsCardSearch;
