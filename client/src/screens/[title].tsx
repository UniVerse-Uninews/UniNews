import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router' // Replace 'your-module-path' with the actual path to the module that defines 'useLocalSearchParams'

export default function TitleScreen() { 
    const {title}=useLocalSearchParams();
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})