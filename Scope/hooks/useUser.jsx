import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

/**
 * CUSTOM AUTHENTICATION HOOK
 * 
 * This is a custom React hook that provides easy access to authentication
 * functions and user state throughout the app.
 * 
 * Purpose:
 * - Simplifies accessing authentication context in components
 * - Provides type-safe access to user data and auth functions
 * - Ensures the hook is only used within the UserProvider boundary
 * 
 * Returns: { user, login, signUp, logOut }
 * - user: Current authenticated user object (or null if not logged in)
 * - login: Function to authenticate existing users
 * - signUp: Function to create new user accounts
 * - logOut: Function to log out current user
 * 
 * Usage in components:
 * const { user, login, signUp, logOut } = useUser()
 */
export function useUser() {
    // Access the UserContext to get authentication state and functions
    const context = useContext(UserContext)
    
    /**
     * ERROR HANDLING
     * Prevents the hook from being used outside of UserProvider
     * This catches developer mistakes early (e.g., forgetting to wrap app in UserProvider)
     * 
     * Without this check, context would be undefined and cause runtime errors
     */
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    
    // Return all authentication functions and user state from context
    return context
}