import { StyleSheet } from 'react-native'
import { StatusBar } from "react-native"
import { Stack } from 'expo-router'
import { useUser } from '../../hooks/useUser'
import GuestOnly from '../../components/auth/GuestOnly'


export default function AuthLayout() {

  const { user, loading } = useUser();
  console.log("AuthLayout - Current User:", user);

  if (loading) {
  return <Text>Loading...</Text>; // Or your custom loading component
}

  return (
    <>
      <StatusBar barStyle="auto" />
      <Stack 
        screenOptions={{
          animation: 'none', 
          headerShown: false 
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signUp" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({})