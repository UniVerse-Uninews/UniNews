import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, Text, View } from "react-native";

export function FontLoader({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    RubikNormal: require("../../../assets/fonts/Rubik.ttf"),
    Teacher: require("../../../assets/fonts/Teachers Students.otf"),
    RubikBold: require("../../../assets/fonts/Rubik-Bold.ttf"),
    RubikMedium: require("../../../assets/fonts/Rubik-Medium.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        setIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
}
