// src/app/auth/index.tsx

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SocialButton } from "@components/socialButton/socialButton";
import { router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.image}></Image>
      <Text style={styles.text}>{user?.fullName}</Text>
      <SocialButton title="Sair" icon="exit" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },

  icon: {
    marginRight: 10,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
