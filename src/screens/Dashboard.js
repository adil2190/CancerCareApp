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

function Dashboard({navigation}) {
  return (
    <View style={styles.container}>
      <DashboardHeader
        label="Dashboard"
        onPressed={() => navigation.openDrawer()}
      />
      <ScrollView>
        <DashboardCard
          onPress={() => navigation.push('MyAppointments', {isBack: true})}
          img={myAppointments}
          label="Appointments"
        />
        <DashboardCard img={myDiet} label="Diet" />
        <DashboardCard img={myExercise} label="Exercise" />
        <DashboardCard img={myMedicine} label="Medications" />
        <DashboardCard
          onPress={() => navigation.push('Notes', {isBack: true})}
          img={myNotes}
          label="Notes"
        />
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
