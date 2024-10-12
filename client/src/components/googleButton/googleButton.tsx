import { Text } from "react-native";
import * as S from "./styles";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const GoogleButton = ({ title, onPress }: ButtonProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <Text>{title}</Text>
      </S.Content>
    </S.Container>
  );
};
