import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  requestUserPermission,
  NotificationListener,
} from './utils/pushNotification-helper';

function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.notificationText}>No notification yet</Text>
    </View>
  );
}

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
