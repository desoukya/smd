import { Image, SafeAreaView, Text, View } from 'react-native'
import React, { useState } from 'react'
import NavOptions from '../components/NavOptions';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


const HomeScreen = () => {
  const [search, setSearch] = useState('');

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
          onChangeText={(text: string) => setSearch(text)}
          showCancel={false}
          value={search}
        />
        <NavOptions />
      </View>
    </SafeAreaView >
  )
}

export default HomeScreen
