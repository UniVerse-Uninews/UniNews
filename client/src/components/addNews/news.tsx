import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Linking } from "react-native";
import { format } from "date-fns";
import {
  Container,
  Name,
  ContainerCabecalho,
  BorderColorButton,
} from "@theme/style";
import { styles } from "@styles/styleFeed";
import { NewsCardProps } from "src/@types/interfaces";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NavigationProp } from "src/@types/navigation-params";
import { getUniversity } from "@services/api";
import { useUniversityFollow } from "@hooks/useUniversityFollow";

const NewsCard: React.FC<NewsCardProps> = ({
  news,
  savedNewsIds,
  handleSaveNews,
  handleRemoveNews,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const dir_save = require("../../../assets/imagens/bookmark_border.png");
  const dir_unsave = require("../../../assets/imagens/bookmark.png");
  const dir_follow = require("../../../assets/imagens/control_point.png");
  const dir_unfollow = require("../../../assets/imagens/dangerous.png");

  const [universityNames, setUniversityNames] = useState<{
    [key: string]: string;
  }>({});
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Fetch and set the university names for each news item
  useFocusEffect(
    React.useCallback(() => {
      const fetchAllUniversityData = async () => {
        const universityIds: any[] = news
          .map((item: any) => item.universityId)
          .filter(Boolean);
        const uniqueUniversityIds: any[] = [...new Set(universityIds)];

        const names = await Promise.all(
          uniqueUniversityIds.map(async (id: any) => {
            const university: any = await getUniversity(String(id));
            return {
              id,
              name: university?.university?.name || "Nome não disponível",
            };
          })
        );

        const universityNamesMap: { [key: string]: any } = names.reduce(
          (acc: any, { id, name }: any) => {
            acc[id] = name;
            return acc;
          },
          {}
        );

        setUniversityNames(universityNamesMap);

        // Initialize follow statuses
        const statuses: { [key: string]: boolean } = {};
        uniqueUniversityIds.forEach((id) => {
          const { isFollowing } = useUniversityFollow(id); // Call the hook here at the top level
          statuses[id] = isFollowing;
        });
        setFollowStatus(statuses);
      };

      fetchAllUniversityData();
    }, [news])
  );

  const toggleFollow = async (universityId: string) => {
    const isCurrentlyFollowing = followStatus[universityId];
    const { handleFollowUniversity, handleUnfollowUniversity } =
      useUniversityFollow(universityId);

    if (isCurrentlyFollowing) {
      await handleUnfollowUniversity();
      setFollowStatus((prev) => ({ ...prev, [universityId]: false }));
    } else {
      await handleFollowUniversity();
      setFollowStatus((prev) => ({ ...prev, [universityId]: true }));
    }
  };

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

                <View style={styles.iconContainerUni}>
                  {item.universityId && universityNames[item.universityId] ? (
                    <BorderColorButton
                      style={styles.profileNameContainer}
                      onPress={() => {
                        navigation.navigate("PerfilUniversidade", {
                          universityId: item.universityId,
                        });
                      }}
                    >
                      <Name numberOfLines={2} style={styles.textUni}>
                        {universityNames[item.universityId]}
                      </Name>
                    </BorderColorButton>
                  ) : (
                    <Name numberOfLines={2} style={styles.textUni}>
                      Universidade não disponível
                    </Name>
                  )}

                  {/* Follow/Unfollow button for the university */}
                  <Pressable
                    style={styles.profileImageContainer}
                    onPress={() => toggleFollow(item.universityId)}
                  >
                    <View style={styles.contImgMais}>
                      <Image
                        source={
                          followStatus[item.universityId]
                            ? dir_unfollow
                            : dir_follow
                        }
                        style={styles.profileImageMais}
                      />
                    </View>
                  </Pressable>
                </View>
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

export default NewsCard;
