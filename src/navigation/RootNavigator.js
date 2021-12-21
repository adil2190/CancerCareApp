import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MyAppointments from '../screens/MyAppointments';
import Notes from '../screens/Notes';
import Dashboard from '../screens/Dashboard';
import DrawerNavigator from './DrawerNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
