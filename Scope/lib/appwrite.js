import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Your API Endpoint
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM)
    .setName(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME);// Your project ID

export const account = new Account(client);
