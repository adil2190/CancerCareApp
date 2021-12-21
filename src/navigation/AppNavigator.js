import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MyAppointments from '../screens/MyAppointments';
import Notes from '../screens/Notes';
import Dashboard from '../screens/Dashboard';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
