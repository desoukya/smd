// expo install expo-web-browser expo-auth-session expo-random
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Allows authentication session to complete and return results back here
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "690170195561-shd7e6qong57hq6duojejrr8ejgn17ms.apps.googleusercontent.com",
    iosClientId: "690170195561-c1un2no4lljpae92eh9pc519e4l89lhd.apps.googleusercontent.com",
    expoClientId: "690170195561-ion4nitrb5hj634806eig1bnbsh6rjf6.apps.googleusercontent.com"
  });

  useEffect(() => {
    setMessage(JSON.stringify(response));
    console.log('response :>> ', response);
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    console.log('accessToken :>> ', accessToken);
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      console.log('userInfoResponse :>> ', data);
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    return (
      <View style={styles.userInfo}>
        <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
        <Text>Welcome {userInfo.name}</Text>
        <Text>{userInfo.email}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userInfo && showUserInfo()}
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({ useProxy: true, showInRecents: true }) }}
      />
      <StatusBar style="auto" />
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
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
