import { StyleSheet, Text, View } from 'react-native'
import {StatusBar} from "react-native"
import {Stack} from 'expo-router'


export default function infoLayout() {
  return (
    <>
      <StatusBar barStyle="auto" />
      <Stack 
        screenOptions={{animation: 'none', headerShown: false 
        }}
      >
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({})