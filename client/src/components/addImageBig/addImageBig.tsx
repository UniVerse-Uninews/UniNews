import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface ImageBigProps {
  diretorio: string;
  style?: ImageStyle;
}

export function ImageBig({ diretorio, style }: ImageBigProps) {
  return (
    <Image
      source={{ uri: diretorio }}
      style={style}
      resizeMode="contain"
    />
  );
}
