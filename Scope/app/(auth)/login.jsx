import { StyleSheet, View, Text, TextInput, Pressable, StatusBar, Platform, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {useUser} from '../../hooks/useUser'; // Import authentication hook
import { Link, router } from 'expo-router'; // Added router import

const Login = () => {
  // State for login credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Tracks authentication process state

  // Get login function from authentication context
  const {login} = useUser()

  // Main authentication handler for existing users
  // Main authentication handler for existing users
  const handleSubmit = async () => {
    // Validation: Check if required fields are filled
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true); // Disable form during authentication process
    
    try {
      console.log("Attempting login...", {email});
      
      // Call the authentication function to log in existing user
      const userData = await login(email, password);
      
      console.log("Login successful, user data:", userData);
      
      // Navigate immediately after successful login
      router.replace('/(dashboard)/(home)/mainHome');
      
    } catch (error) {
      // Handle authentication errors (e.g., wrong password, user not found, network issues)
      console.error("Login error:", error);
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false); // Re-enable form after authentication attempt
    }
  };

  // Placeholder handler for Google OAuth authentication
  const handleGoogleLogin = () => {
    console.log("Google Login Pressed");
    Alert.alert('Coming Soon', 'Google sign in will be available soon!');
    // TODO: Implement Google OAuth sign-in flow
  };

  // Placeholder handler for Apple OAuth authentication
  const handleAppleLogin = () => {
    console.log("Apple Login Pressed");
    Alert.alert('Coming Soon', 'Apple sign in will be available soon!');
    // TODO: Implement Apple Sign In authentication
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <LinearGradient
          style={styles.container}
          colors={["#50C6FF", "#4ABFFF","#40ADFF", "#297CFF", "#0F3EFF"]}
        >
          <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
            
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>SCOPE</Text>
            </View>

            {/* White Card */}
            <View style={styles.whiteCard}>
              <Text style={styles.title}>Login</Text>
              
              {/* Link to sign up for new users */}
              <Text style={styles.subtitle}>
                Don't have an account? <Link href="/(auth)/signUp" style={styles.link}>Sign Up</Link>
              </Text>

              {/* Email Input - Primary authentication credential */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none" // Prevent auto-capitalization for email addresses
                onChangeText={setEmail}
                value={email}
                editable={!loading} // Disable input during authentication
              />

              {/* Password Input - Primary authentication credential */}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry // Hide password characters for security
                onChangeText={setPassword}
                value={password}
                editable={!loading} // Disable input during authentication
              />

              {/* Forgot Password Link */}
              <View style={styles.row}>
                <Text style={styles.link}>Forgot Password?</Text>
              </View>

              {/* Primary Login Button - Triggers email/password authentication */}
              <Pressable 
                onPress={handleSubmit}
                style={({pressed}) => [
                  styles.loginButton, 
                  pressed && styles.btnPressed,
                  loading && styles.btnDisabled // Visual feedback during authentication
                ]}
                disabled={loading} // Prevent multiple authentication requests
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
              </Pressable>
          
              <Text style={styles.orText}>or</Text>

              {/* Google OAuth Login Button - Alternative authentication method */}
              <Pressable 
                onPress={handleGoogleLogin}
                style={({pressed}) => [styles.socialButton, pressed && styles.socialBtnPressed]}
                disabled={loading} // Disable during active authentication
              >
                <Text>Continue with Google</Text>
              </Pressable>

              {/* Apple Sign In Button - Alternative authentication method */}
              <Pressable 
                onPress={handleAppleLogin}
                style={({pressed}) => [styles.socialButton, pressed && styles.socialBtnPressed]}
                disabled={loading} // Disable during active authentication
              >
                <Text>Continue with Apple</Text>
              </Pressable>
            </View>

          </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  whiteCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  link: {
    color: '#0F3EFF',
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  btnPressed: {
    opacity: 0.75
  },
  btnDisabled: { // Added for loading state
    opacity: 0.5
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialBtnPressed: {
    backgroundColor: '#F0F0F0'
  }
});

export default Login;