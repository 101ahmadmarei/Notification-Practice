import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  // console.log('requestUserPermission');
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

const GetFCMToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      console.log('token', token);
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

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('FCM Message Data:', remoteMessage.notification);
  });
};
