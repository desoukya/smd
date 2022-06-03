import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import {default as en} from './resources/en';
import {default as es} from './resources/es';
import {default as ar} from './resources/ar';

import { useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

export default function App() {
  const [locale, setLocale] = useState(Localization.locale === 'ar-US' ? 'ar' : 'en');
  i18n.translations = { ar, en, es };
  i18n.locale = locale;
  return (
    <View style={styles.container}>
      { locale !== 'en' && <Button title='switch to english' onPress={()=> setLocale('en')}></Button>}
      { locale !== 'ar' && <Button title='switch to arabic' onPress={()=> setLocale('ar')}></Button>}
      { locale !== 'es' && <Button title='switch to spanish' onPress={()=> setLocale('es')}></Button>}
      <Text style={styles.translationText}>{i18n.t('welcome')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  translationText: {
    fontSize: 50
  }
});
