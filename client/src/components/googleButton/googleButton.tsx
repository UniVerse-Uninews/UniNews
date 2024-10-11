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
        <S.ImageIcon
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          }}
        />
        <Text>{title}</Text>
      </S.Content>
    </S.Container>
  );
};
