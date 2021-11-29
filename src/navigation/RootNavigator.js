import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MyAppointments from '../screens/MyAppointments';
import Notes from '../screens/Notes';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
