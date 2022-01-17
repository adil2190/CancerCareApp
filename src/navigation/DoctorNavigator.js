import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import DoctorLogin from '../screens/DoctorLogin';
import DoctorDashboard from '../screens/DoctorDashboard';

const Doctor = createStackNavigator();
function DoctorNavigator(props) {
  return (
    <Doctor.Navigator
      initialRouteName="DoctorLogin"
      screenOptions={{headerShown: false}}>
      <Doctor.Screen name="DoctorLogin" component={DoctorLogin} />
      <Doctor.Screen name="DoctorDashboard" component={DoctorDashboard} />
    </Doctor.Navigator>
  );
}

export default DoctorNavigator;
