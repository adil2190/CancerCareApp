import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import AppNavigator from './AppNavigator';
import LoginAs from '../screens/LoginAs';
import DoctorNavigator from './DoctorNavigator';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
      <Stack.Screen name="LoginAs" component={LoginAs} />
      <Stack.Screen name="DoctorNavigator" component={DoctorNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
