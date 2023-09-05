import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Goals = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.notificationText}>Goals PAGE</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  notificationText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default Goals;
