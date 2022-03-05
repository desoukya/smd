import { View, Button, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const data = [
  {
    id: 1,
    title: 'Google Search',
    screen: 'SearchScreen',
  },
  {
    id: 2,
    title: 'I\'m Feeling Lucky',
    screen: 'SearchScreen',
  }
]
const NavOptions = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  text: {
    color: "black",
    textAlign: "center",
  },
});
export default NavOptions