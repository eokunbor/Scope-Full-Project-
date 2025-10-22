import { StyleSheet, Text, View } from 'react-native'
import {StatusBar} from "react-native"
import {Stack, Tabs} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import UserOnly from '../../components/auth/UserOnly'


export default function DashboardLayout() {
  return (
    <UserOnly>
        <Tabs screenOptions = {
            {tabBarStyle: {paddingTop:10, height:90},
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888'
        }}>
            <Tabs.Screen name="(home)" 
            options={{title:'Home', tabBarIcon: ({focused}) =>(
                <Ionicons
                size={24}
                name={focused ? "home" : "home-outline"}
                color={focused ? '#000' : '#888'}
                />
            )}}/>

            <Tabs.Screen name="(info)" 
            options={{title:'Care',  tabBarIcon: ({focused}) =>(
                <Ionicons
                size={24}
                name={focused ? "medkit" : "medkit-outline"}
                color={focused ? '#000' : '#888'}
                />
            )}}/>

            <Tabs.Screen name="(track)" 
            options={{title:'Progress',  tabBarIcon: ({focused}) =>(
                <Ionicons
                size={24}
                name={focused ? "bar-chart" : "bar-chart-outline"}
                color={focused ? '#000' : '#888'}
                />
            )}}/>
            
            <Tabs.Screen name="(user)" 
            options={{title:'Me', tabBarIcon: ({focused}) =>(
                <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color={focused ? '#000' : '#888'}
                />
            )}}/>
        </Tabs>
    </UserOnly>
  );
}

const styles = StyleSheet.create({})