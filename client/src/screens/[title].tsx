import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router' 

export default function TitleScreen() { 
    const {title}=useLocalSearchParams();
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})