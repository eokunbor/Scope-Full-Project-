import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../../hooks/useUser'


const mainProfile = () => {
  const {logOut, user } = useUser()

  return (
    <View>
      <Text>mainprofile</Text>
      <Text>{user.email}</Text>

    <Pressable 
    onPress={logOut}
    style={({pressed}) => [styles.loginButton, pressed && styles.btnPressed]}>
      <Text>Logout</Text>
    </Pressable>

    </View>
  )
}

export default mainProfile

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  btnPressed: {
    opacity: 0.75
  },
  
    
})