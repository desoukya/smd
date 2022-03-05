import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import NavOptions from '../components/NavOptions';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/google_logo.png')}
        />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text: string) => setSearch(text)}
          showCancel={false}
          value={search}
        />
        <NavOptions />
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'    
  }
});

export default HomeScreen
