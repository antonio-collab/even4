import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CreateEvent = () => {
  return (
    <View style={style.container}> 
      <Text>CreateEvent</Text>
    </View>
  )
}

export default CreateEvent

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})