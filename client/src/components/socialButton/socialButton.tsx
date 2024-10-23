// src/components/socialButton/socialButton.tsx

import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void; // Adiciona uma prop para a função de callback
}

export function SocialButton({
  title,
  icon,
  isLoading,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={isLoading}
      activeOpacity={0.8}
      onPress={onPress} // Define o onPress para chamar a função passada
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Ionicons name={icon} size={24} color="black" />
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
