import { StyleSheet, Text, View, Image } from 'react-native'
import { useFonts } from 'expo-font';
import React from 'react'
import {Link} from 'expo-router'
import splashLoginImg from '../assets/img/mainImage/splashLogin.png'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

const splashLogin = () => {
  const [fontsLoaded] = useFonts({
    'Nexa-Heavy': require('../assets/fonts/Nexa-Heavy.ttf'),
    'ZabalDEMO-Light': require('../assets/fonts/ZabalDEMO-Light.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // or return a loading component
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to Scope</Text>
      <Text style={styles.h2}>Scope out your path to wellness!</Text>
      <Image source={splashLoginImg} style={styles.Tester}/>
      <Link href="/login">Login</Link>
      <Link href="/signUp">Sign Up</Link>
    </View>
  )
}

export default splashLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1:{
    fontFamily: 'Nexa-Heavy',  // Use custom font
    fontSize: 30,
    textAlign: 'center'
  },
  h2:{
    fontFamily: 'ZabalDEMO-Light',  // Use custom font
    fontSize: 20,
    marginBottom: 40
  },
  Tester:{
    width: 330,
    height: 403
  }
})