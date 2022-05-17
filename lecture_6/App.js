import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      // prompt the user for camera permission
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');

      // prompt the user for access to media library
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (<SafeAreaView><Text>Requesting permission...</Text></SafeAreaView>)
  } else if (!hasCameraPermission) {
    return (<SafeAreaView><Text>Permission for camera not granted.</Text></SafeAreaView>)
  }

  const takePicture = async () => {
    const pictureOptions = {
      quality: 1,
      base64: true,
    };
    const newPhoto = await cameraRef.current.takePictureAsync(pictureOptions);
    setPhoto(newPhoto);
  }

  if (photo) {
    const sharePicture = () => shareAsync(photo.uri).then(() => setPhoto(undefined));
    const savePicture = () => MediaLibrary.saveToLibraryAsync(photo.uri).then(() => setPhoto(undefined));

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
        <Button title='Share' onPress={sharePicture} />
        { hasMediaLibraryPermission && <Button title='Save' onPress={savePicture} /> }
        <Button title='Discard' onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title='Take a Picture' onPress={takePicture} />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});
