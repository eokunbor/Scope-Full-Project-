import { StyleSheet, Image, StatusBar, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/img/logos/white_Logo.png'

const Home = () => {
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        style={styles.container}
        colors={["#50C6FF", "#4ABFFF","#40ADFF", "#297CFF", "#0F3EFF"]}
      >
        <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
          <Image source = {Logo} style= {styles.WhiteLogo}/>
        </SafeAreaView>
      </LinearGradient>
    </>
  )
}

export default Home

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  WhiteLogo: {
    width: 200,
    height: 200,
  }
})