import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard';
import MyAppointments from '../screens/MyAppointments';
import Notes from '../screens/Notes';

function DrawerNavigator(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="MyAppointments" component={MyAppointments} />
      <Drawer.Screen name="Notes" component={Notes} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
