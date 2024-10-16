//src/storage/tokenCache.ts

import * as SecureStore from "expo-secure-store";

async function getToken(key: string) {
  try {
    return SecureStore.getItem(key);
  } catch (e) {
    console.log(e);
  }
}

async function saveToken(key: string, value: string) {
  try {
    return SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log(e);
  }
}

export const tokenCache = { getToken, saveToken };
