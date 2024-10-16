//src/app/index.tsx

import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SocialButton } from "@components/socialButton/socialButton";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  async function onGoogleSignIn() {
    try {
      setIsLoading(true);
      const oAuthFlow = await googleOAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
        console.log("Failure", oAuthFlow);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <SocialButton
        title="Sign in with Google"
        icon="logo-google"
        onPress={onGoogleSignIn}
        isLoading={isLoading}
      />
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
});
