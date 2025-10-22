import { StyleSheet, View, Text, TextInput, Pressable, StatusBar, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {useUser} from '../../hooks/useUser'; // Import custom hook for user authentication
import { Link, router } from 'expo-router';

const SignUp = () => {
  // State management for all form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState(''); // Stores user's email for authentication
  const [password, setPassword] = useState(''); // Stores user's password for authentication
  const [loading, setLoading] = useState(false); // Tracks authentication process state

  // Get signUp function from authentication context/hook
  const {signUp} = useUser();

  // Main authentication handler for email/password sign up
  const handleSubmit = async () => {
    // Validation: Check if required fields are filled
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validation: Check if date of birth is complete
    if (!month || !day || !year) {
      Alert.alert('Error', 'Please enter your complete date of birth');
      return;
    }

    // Validation: Enforce minimum password length for security
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true); // Disable form during authentication process
    
    try {
      console.log("Attempting sign up...", { firstName, lastName, month, day, year, email });
      
      // Call the authentication function to create new user account
      await signUp(email, password);
      
      // On successful authentication, show success message and navigate to main app
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(dashboard)/(home)/mainHome') // Redirect authenticated user to home
        }
      ]);
      
    } catch (error) {
      // Handle authentication errors (e.g., email already exists, weak password, network issues)
      console.error("Sign up error:", error);
      Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false); // Re-enable form after authentication attempt
    }
  };

  // Placeholder handler for Google OAuth authentication
  const handleGoogleSignUp = () => {
    console.log("Google Sign Up Pressed");
    Alert.alert('Coming Soon', 'Google sign up will be available soon!');
    // TODO: Implement Google OAuth sign-in flow
  };

  // Placeholder handler for Apple OAuth authentication
  const handleAppleSignUp = () => {
    console.log("Apple Sign Up Pressed");
    Alert.alert('Coming Soon', 'Apple sign up will be available soon!');
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

            {/* White Card with ScrollView */}
            <ScrollView 
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.whiteCard}>
                <Text style={styles.title}>Create an Account</Text>
                
                {/* Link to login for existing users */}
                <Text style={styles.subtitle}>
                  Already have an account? <Link href="/(auth)/login" style={styles.link}>Login</Link>
                </Text>

                {/* Name Fields */}
                <View style={styles.row}>
                  <View style={styles.halfContainer}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={[styles.input, styles.halfInput]}
                      placeholder="First name"
                      autoCapitalize="words"
                      onChangeText={setFirstName}
                      value={firstName}
                      editable={!loading} // Disable input during authentication
                    />
                  </View>
                  
                  <View style={styles.halfContainer}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={[styles.input, styles.halfInput]}
                      placeholder="Last name"
                      autoCapitalize="words"
                      onChangeText={setLastName}
                      value={lastName}
                      editable={!loading} // Disable input during authentication
                    />
                  </View>
                </View>

                {/* Birthday Fields */}
                <Text style={styles.label}>Date of Birth</Text>
                <View style={styles.birthdayRow}>
                  <TextInput
                    style={[styles.input, styles.birthdayInput]}
                    placeholder="MM"
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={setMonth}
                    value={month}
                    editable={!loading} // Disable input during authentication
                  />
                  <TextInput
                    style={[styles.input, styles.birthdayInput]}
                    placeholder="DD"
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={setDay}
                    value={day}
                    editable={!loading} // Disable input during authentication
                  />
                  <TextInput
                    style={[styles.input, styles.yearInput]}
                    placeholder="YYYY"
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={setYear}
                    value={year}
                    editable={!loading} // Disable input during authentication
                  />
                </View>

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
                  placeholder="Enter your password (min 8 characters)"
                  secureTextEntry // Hide password characters for security
                  onChangeText={setPassword}
                  value={password}
                  editable={!loading} // Disable input during authentication
                />

                {/* Primary Sign Up Button - Triggers email/password authentication */}
                <Pressable 
                  onPress={handleSubmit}
                  style={({pressed}) => [
                    styles.signUpButton, 
                    pressed && styles.btnPressed,
                    loading && styles.btnDisabled // Visual feedback during authentication
                  ]}
                  disabled={loading} // Prevent multiple authentication requests
                >
                  <Text style={styles.signUpButtonText}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Text>
                </Pressable>
            
                <Text style={styles.orText}>or</Text>

                {/* Google OAuth Sign Up Button - Alternative authentication method */}
                <Pressable 
                  onPress={handleGoogleSignUp}
                  style={({pressed}) => [styles.socialButton, pressed && styles.socialBtnPressed]}
                  disabled={loading} // Disable during active authentication
                >
                  <Text>Continue with Google</Text>
                </Pressable>

                {/* Apple Sign In Button - Alternative authentication method */}
                <Pressable 
                  onPress={handleAppleSignUp}
                  style={({pressed}) => [styles.socialButton, pressed && styles.socialBtnPressed]}
                  disabled={loading} // Disable during active authentication
                >
                  <Text>Continue with Apple</Text>
                </Pressable>

                {/* Terms Text */}
                <Text style={styles.termsText}>
                  By signing up, you agree to our{'\n'}
                  <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
                </Text>
              </View>
            </ScrollView>

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
    marginTop: 20,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
    gap: 12,
  },
  halfContainer: {
    flex: 1,
  },
  halfInput: {
    width: '100%',
  },
  birthdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  birthdayInput: {
    flex: 1,
    textAlign: 'center',
  },
  yearInput: {
    flex: 1.5,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  btnPressed: {
    opacity: 0.75
  },
  btnDisabled: {
    opacity: 0.5
  },
  signUpButtonText: {
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
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 16,
    lineHeight: 18,
  }
});

export default SignUp;