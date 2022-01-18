import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import DoctorLogin from '../screens/DoctorLogin';
import DoctorDashboard from '../screens/DoctorDashboard';
import DoctorDrawer from './DoctorDrawer';
import DoctorAppointment from '../screens/DoctorAppointments';
import CancerDetection from '../screens/CancerDetection';

const Doctor = createStackNavigator();
function DoctorNavigator(props) {
  return (
    <Doctor.Navigator
      initialRouteName="DoctorLogin"
      screenOptions={{headerShown: false}}>
      <Doctor.Screen name="DoctorLogin" component={DoctorLogin} />
      <Doctor.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Doctor.Screen name="DoctorDrawer" component={DoctorDrawer} />
      <Doctor.Screen name="DoctorAppointment" component={DoctorAppointment} />
      <Doctor.Screen name="CancerDetection" component={CancerDetection} />
    </Doctor.Navigator>
  );
}

export default DoctorNavigator;
