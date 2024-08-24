import React from 'react';
import { useFonts } from 'expo-font';

export  function FontLoader({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    RubikNormal: require('../../../assets/fonts/Rubik.ttf'),
    Teacher: require('../../../assets/fonts/Teachers Students.otf'),
    RubikBold: require('../../../assets/fonts/Rubik-Bold.ttf'),
    RubikMedium: require('../../../assets/fonts/Rubik-Medium.ttf'),
  });


  return <>{children}</>;
}
