import React from 'react';
import { useFonts } from 'expo-font';

export  function FontLoader({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    Rubik: require('../../../assets/fonts/Rubik.ttf'),
    // Teacher: require('../../../assets/fonts/Teacher Students.ttf'),
  });


  return <>{children}</>;
}
