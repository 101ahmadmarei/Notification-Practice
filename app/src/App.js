import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// ... (your other imports)

import {Text, View, StyleSheet} from 'react-native';
import {
  requestUserPermission,
  NotificationListener,
} from './utils/pushNotification-helper';
import PushNotification from 'react-native-push-notification';
import Home from './pages/Home';
import Goals from './pages/Goals';

PushNotification.createChannel(
  {
    channelId: 'test-channel', // This should be unique for your app
    channelName: 'Test Channel', // The name that will be displayed for the channel on the user's device
    channelDescription: 'A test channel for React Native notifications', // Description for the channel
    soundName: 'default', // The sound that will be used for notifications sent to this channel
    importance: 4, // Importance level for the notifications; affects how they are displayed on the user's device
    vibrate: true, // Whether the notifications should vibrate the device
  },
  created => console.log(`createChannel returned '${created}'`), // Callback that lets you know whether the channel was created successfully
);
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Home Page'}}
        />
        <Stack.Screen
          name="Goals"
          component={Goals}
          options={{title: 'Goals Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ... (the rest of your code)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  notificationText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
