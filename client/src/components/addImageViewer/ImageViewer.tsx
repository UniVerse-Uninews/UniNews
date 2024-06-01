import { Image } from 'react-native';
import React from 'react';
import { styles } from './imageViewerStyle';

export default function ImageViewer({ diretorio }: { diretorio: any }) {
  return <Image source={diretorio} style={styles.image} />;
}
