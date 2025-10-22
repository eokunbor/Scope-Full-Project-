import { createContext, useState, useEffect } from 'react'

import { account } from '../lib/appwrite' // Appwrite SDK instance for authentication
import { ID } from 'react-native-appwrite' // Utility to generate unique user IDs

// Create React Context to share authentication state across the entire app
export const UserContext = createContext()

// Provider component that wraps the app and manages authentication state
export function UserProvider({children}) {

    // Global state to store the currently authenticated user's data
    // null = no user logged in, object = user is authenticated
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // Track initial session check
    const [authChecked, setAuthChecked] = useState(false);

    /**
     * CHECK FOR EXISTING SESSION ON APP LOAD
     * When the app starts, check if there's already an active session
     * This ensures users stay logged in between app restarts
     */
    useEffect(() => {
        checkUserSession();
    }, []);

    async function checkUserSession() {
        try {
            // Try to get the current user's account info
            const response = await account.get();
            console.log("Found existing session:", response);
            setUser(response); // User is already logged in
        } catch (error) {
            console.log("No existing session found");
            setUser(null); // No active session
        } finally {
            setLoading(false); // Done checking
        }
    }

    /**
     * LOGIN FUNCTION
     * Authenticates existing users with email and password
     */
    async function login(email, password) {
        try {
            // IMPORTANT: Delete any existing session before creating a new one
            try {
                await account.deleteSession('current');
                console.log("Deleted existing session");
            } catch (error) {
                console.log("No existing session to delete");
            }
            
            // Create authentication session with Appwrite
            await account.createEmailPasswordSession(email, password)
            console.log("Session created successfully");
            
            // Fetch the authenticated user's account information
            const response = await account.get()
            console.log("User data retrieved:", response);
            
            // Store user data in global state (makes user available app-wide)
            setUser(response)
            console.log("User state updated:", response);
            
            return response; // Return user data for confirmation
        } catch(error) {
            console.log("Error during login:", error);
            // Throw error so the UI can display specific error messages
            throw error;
        }
    }

    /**
     * SIGN UP FUNCTION
     * Creates new user account and automatically logs them in
     */
    async function signUp(email, password) {
        try {
            // Create new user account with unique ID, email, and password
            await account.create(ID.unique(), email, password)
            console.log("Account created successfully");
            
            // Automatically log in the newly created user
            await login(email, password)
        } catch(error) {
            console.log("Error during sign up:", error);
            throw error;
        }
    }

    /**
     * LOGOUT FUNCTION
     * Logs out the current user by deleting the session on the server
     */
    async function logOut() {
        try {
            // Delete the current session on Appwrite server
            await account.deleteSession('current');
            console.log("Session deleted on server");
            
            // Clear user from global state (user is now logged out in the app)
            setUser(null);
        } catch(error) {
            console.log("Error during logout:", error);
            // Even if server logout fails, clear local state
            setUser(null);
        }
    }

    async function getInitialUserValue(){
        try{
            const response = await account.get()
            setUser(response)
        } catch (error){
            setUser(null)
        }finally{
            setAuthChecked(true);
        }
    }

    useEffect(() =>{
        getInitialUserValue()
    }, [])

    // Provide authentication functions and user state to all child components
    return(
        <UserContext.Provider value={{user, login, signUp, logOut, loading}}>
            {children}
        </UserContext.Provider>
    )
}