import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { UserProvider } from '../contexts/userContext';
import React from 'react';

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="(bootUp)" options={{ headerShown: false }} />
        <Stack.Screen name="(quiz)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: 'Splash Screen', headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});