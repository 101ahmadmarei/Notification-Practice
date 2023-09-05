import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.notificationText}>HOME PAGE</Text>
      <Button
        title="Go to Goals"
        onPress={() => navigation.navigate('Goals')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  notificationText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
