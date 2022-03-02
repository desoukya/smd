import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import NavOptions from '../components/NavOptions';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';


const HomeScreen = () => {
  const tw = useTailwind();
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    console.log('search', search)
    setSearch(search);
  };

  return (
    <SafeAreaView>
      {/* <Text style={styles.text}>HomeScreen</Text> */}
      {/* <Text style={tw('text-blue-600 p-10')}>HomeScreen</Text> */}

      {/* 
          Add Padding to all sides p-size 
          https://tailwindcss.com/docs/padding
      */}
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
          source={{
            uri: 'https://tinyurl.com/n58ap4f8'
          }} />

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

/* We could style this way - nothing wrong with it - but Tailwind is better */
// const styles = StyleSheet.create({
//     text: {
//       color: 'blue'
//     }
//   });
