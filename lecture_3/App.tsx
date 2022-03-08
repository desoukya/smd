import HomeScreen from './screens/HomeScreen';
import SearchResults from './screens/SearchResults';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();


const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false,  
        }} 
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResults}
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;