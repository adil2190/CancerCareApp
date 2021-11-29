import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../constants/colors';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';
import {
  myAppointments,
  myDiet,
  myExercise,
  myMedicine,
  myNotes,
} from '../assets/assets';

function Dashboard(props) {
  return (
    <View style={styles.container}>
      <DashboardHeader label="Dashboard" />
      <ScrollView>
        <DashboardCard img={myAppointments} label="Appointments" />
        <DashboardCard img={myDiet} label="Diet" />
        <DashboardCard img={myExercise} label="Exercise" />
        <DashboardCard img={myMedicine} label="Medications" />
        <DashboardCard img={myNotes} label="Notes" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
});

export default Dashboard;
