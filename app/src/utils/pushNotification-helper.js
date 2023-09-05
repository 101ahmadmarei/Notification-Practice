import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

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
  const fcmToken = await AsyncStorage.getItem('cobra_fcmT');
  console.log('fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      console.log('token', token);
      if (token) {
        console.log('FCM Token:', token);
        AsyncStorage.setItem('cobra_fcmT', token);
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
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      channelId: 'your-channel-id', // you also have to setup this
    });
  });
};
