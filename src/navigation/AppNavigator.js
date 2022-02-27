import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MyAppointments from '../screens/MyAppointments';
import Notes from '../screens/Notes';
import Dashboard from '../screens/Dashboard';
import DrawerNavigator from './DrawerNavigator';
import AccountCreated from '../screens/AccountCreated';
import SignUp from '../screens/SignUp';
import AddNote from '../screens/AddNote';
import NoteDetails from '../screens/NoteDetails';
import AddNewAppointments from '../screens/AddNewAppointments';
import MyMedicines from '../screens/MyMedicines';
import AddMedicine from '../screens/AddMedicine';
import AppointmentDetails from '../screens/AppointmentDetails';
import Diet from '../screens/Diet';
import Exercises from '../screens/Exercises';
import DoctorAlerts from '../screens/DoctorAlerts';
import AddNewAppointmentPatient from '../screens/AddNewAppointmentPatient';

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
      <Stack.Screen name="MyMedicines" component={MyMedicines} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="AccountCreated" component={AccountCreated} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="NoteDetails" component={NoteDetails} />
      <Stack.Screen name="AddNewAppointments" component={AddNewAppointments} />
      <Stack.Screen name="AddMedicine" component={AddMedicine} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="Diet" component={Diet} />
      <Stack.Screen name="Exercises" component={Exercises} />
      <Stack.Screen name="DoctorAlerts" component={DoctorAlerts} />
      <Stack.Screen
        name="AddNewAppointmentPatient"
        component={AddNewAppointmentPatient}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
