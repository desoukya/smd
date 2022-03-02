import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';

export default function App() {
  return (
    <ScrollView>

    <SafeAreaView style={styles.container}>

      <SafeAreaView style={styles.shape_container}>
          <SafeAreaView style={styles.square} />
      </SafeAreaView>
      
      <SafeAreaView style={styles.shape_container}>
          <SafeAreaView style={styles.rectangle} />
      </SafeAreaView>

      <SafeAreaView style={styles.shape_container}>
          <SafeAreaView style={styles.circle} />
      </SafeAreaView>

      <SafeAreaView style={styles.shape_container}>
          <SafeAreaView style={styles.triangle} />
      </SafeAreaView>

    </SafeAreaView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape_container: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  square: {
    width: 120,
    height: 120,
    backgroundColor: 'green'
  },
  rectangle: {
    width: 120 * 2,
    height: 120,
    backgroundColor: 'yellow'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'orange'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 120,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    // transform: [{ rotate: '90deg'}]
  },
});
