import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const splashLogin = () => {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>splashLogin</Text>
    </View>
  )
}

export default splashLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    textAlign: 'center'
  }

})
