import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Events = () => {
  return (
    <View style={style.container}>
      <Text>Events</Text>
    </View>
  )
}

export default Events

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})