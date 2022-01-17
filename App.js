import React from 'react';
import {View, Text} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';

function App(props) {
  LogBox.ignoreLogs(['Reanimated 2']);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
