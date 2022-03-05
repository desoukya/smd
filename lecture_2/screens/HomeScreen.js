import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import NavOptions from '../components/NavOptions';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


const HomeScreen = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    console.log('search', search)
    setSearch(search);
  };

  return (
    <SafeAreaView>
      <View style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
            }
          ]}>
        <Image
          style={[
            {
              width: 200,
              height: 200,
              resizeMode: 'contain'
            }
          ]}
          source={require('../assets/google_logo.png')}
          />

        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          showCancel={false}
          value={search}
        />

        <NavOptions />
      </View>
    </SafeAreaView >
  )
}

export default HomeScreen
