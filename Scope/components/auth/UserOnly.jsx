import { useRouter } from 'expo-router'
import { useUser } from '../../hooks/useUser'
import { useEffect, useRef } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

const UserOnly = ({children}) => {
    const { user, loading } = useUser()
    const router = useRouter();
    const hasRedirected = useRef(false); // Prevent multiple redirects

    useEffect(() => {
        // Only redirect once when authentication check is complete and user is null
        if (!loading && user === null && !hasRedirected.current) {
            console.log("No user found, redirecting to login");
            hasRedirected.current = true; // Mark as redirected
            router.replace('/(auth)/login')
        }
        
        // Reset redirect flag when user logs in
        if (user !== null) {
            hasRedirected.current = false;
        }
    }, [user, loading]) // Only depend on user and loading

    // Show loading while checking authentication status
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0066FF" />
                <Text>Checking authentication...</Text>
            </View>
        )
    }

    // If not loading but no user, show loading briefly while redirect happens
    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Redirecting to login...</Text>
            </View>
        )
    }

    // User is authenticated, show protected content
    return children
}

export default UserOnly;