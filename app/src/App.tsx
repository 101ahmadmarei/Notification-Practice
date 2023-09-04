import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {requestUserPermission} from './utils/pushNotification-helper';

function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>Hello World</Text>
    </View>
  );
}

export default App;
