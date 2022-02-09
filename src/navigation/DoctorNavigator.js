import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import DoctorLogin from '../screens/DoctorLogin';
import DoctorDashboard from '../screens/DoctorDashboard';
import DoctorDrawer from './DoctorDrawer';
import DoctorAppointment from '../screens/DoctorAppointments';
import CancerDetection from '../screens/CancerDetection';
import AssignedMedicines from '../screens/AssignedMedicines';
import AddMedicineDoctor from '../screens/AddMedicineDoctor';
import AddNewAppointments from '../screens/AddNewAppointments';
import PatientAlerts from '../screens/PatientAlerts';

const Doctor = createStackNavigator();
function DoctorNavigator(props) {
  return (
    <Doctor.Navigator
      initialRouteName="DoctorDrawer"
      screenOptions={{headerShown: false}}>
      <Doctor.Screen name="DoctorLogin" component={DoctorLogin} />
      <Doctor.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Doctor.Screen name="DoctorDrawer" component={DoctorDrawer} />
      <Doctor.Screen name="DoctorAppointment" component={DoctorAppointment} />
      <Doctor.Screen name="CancerDetection" component={CancerDetection} />
      <Doctor.Screen name="AssignedMedicines" component={AssignedMedicines} />
      <Doctor.Screen name="AddMedicine" component={AddMedicineDoctor} />
      <Doctor.Screen name="AddNewAppointments" component={AddNewAppointments} />
      <Doctor.Screen name="PatientAlerts" component={PatientAlerts} />
    </Doctor.Navigator>
  );
}

export default DoctorNavigator;
