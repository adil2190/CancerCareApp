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
  cancerdetection,
} from '../assets/assets';

function DoctorDashboard({navigation}) {
  console.warn = () => {};
  return (
    <View style={styles.container}>
      <DashboardHeader
        label="Dashboard"
        onPressed={() => navigation.openDrawer()}
      />
      <ScrollView>
        <DashboardCard
          // onPress={() => navigation.push('MyMedicines', {isBack: true})}
          img={myMedicine}
          label="Medications"
        />
        <DashboardCard
          onPress={() => navigation.push('DoctorAppointment', {isBack: true})}
          img={myAppointments}
          label="Appointments"
        />
        <DashboardCard
          imgStyles={{height: 90, width: 105, margin: 10, marginLeft: 20}}
          img={cancerdetection}
          label="AI Cancer Detection"
          onPress={() => navigation.push('CancerDetection', {isBack: true})}
        />
        <DashboardCard img={myDiet} label="Diet" />
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

export default DoctorDashboard;
