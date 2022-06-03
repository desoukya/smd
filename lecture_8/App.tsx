import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

export default function App() {
  const [permission, setPermission] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Birthday,
            Contacts.Fields.Emails,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });     
        
        console.log('data :>> ', data);
        if (data?.length) setContacts(data);
      } else {
        setPermission('User did not grant access to contacts');
      }
    })();
  }, []);

  const showContacts = () => {
    if (contacts) {
      return contacts.map((contact, index) => {
        return (
          <View key={index} style={styles.contact}>
            <Text>Name: {contact.firstName} {contact.lastName}</Text>
            {contact.birthday && <Text>Birthday: {contact.birthday.month} / {contact.birthday.day} / {contact.birthday.year}</Text>}
            {(contact.phoneNumbers || []).map((phoneNumber) => (
              <View>
                <Text>{phoneNumber.label}: {phoneNumber.number}</Text>
              </View>
            ))}
            {(contact.emails || []).map(({ label, email }) => (
              <View>
                <Text>{label}: {email}</Text>
              </View>
            ))}
          </View>
        );
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {showContacts()}
      </ScrollView>
      <Text>{permission}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    marginVertical: 8
  }
});