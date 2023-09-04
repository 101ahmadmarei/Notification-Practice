import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  console.log('requestUserPermission');
  // const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  //   GetFCMToken();
  // }
}

const GetFCMToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        AsyncStorage.setItem('fcmToken', token);
      } else {
        console.log('No token received');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
