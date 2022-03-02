import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';

const data = [
  {
    id: '1',
    title: 'Google Search',
    screen: 'SearchScreen',
  },
  {
    id: '2',
    title: 'I\m Feeling Lucky',
    screen: 'SearchScreen',
  }
]
const NavOptions = () => {
  const tw = useTailwind();
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        // padding 2
        // padding left 6
        // padding bottom 8
        // m-2 separate so not touching
        < TouchableOpacity style={tw('p-2 pl-6 bg-gray-200 m-2 w-40')}>
          <View>
            <Text style={tw('mt-2')}>{item.title}</Text>
          </View>
        </TouchableOpacity >
      )}

    />
  )
}

export default NavOptions