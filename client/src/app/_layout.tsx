// src/app/_layout.tsx
import { router, Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "src/storage/tokenCache";

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.replace("/client/src/screens/feed.tsx");
    } else {
      router.replace("/client/src/screens/loginScreen.tsx");
    }
  }, [isSignedIn, isLoaded]);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator size="large" color="#0000ff" />
  );
}

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
