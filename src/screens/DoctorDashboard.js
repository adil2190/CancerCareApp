import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../context/AuthContext';
import {colors} from '../constants/colors';
import {collectionNames} from '../constants/collections';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';
import {
  myAppointments,
  myDiet,
  myExercise,
  myMedicine,
  myNotes,
  cancerdetection,
  notification,
} from '../assets/assets';

function DoctorDashboard({navigation}) {
  const [alertCount, setAlertCount] = React.useState(0);
  const {doctorData} = React.useContext(AuthContext);
  console.warn = () => {};
  useEffect(() => {
    console.log('from context ----------> ', doctorData);
    const subscribe = firestore()
      .collection(collectionNames.patientAlerts)
      .where('doctorId', '==', doctorData.userId)
      .onSnapshot(querySnapshot => {
        let localData = [];
        querySnapshot.forEach(doc => {
          localData.push({...doc.data(), selfId: doc.id});
        });
        setAlertCount(localData.filter(item => item.isRead == false).length);
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <DashboardHeader
        label="Dashboard"
        onPressed={() => navigation.openDrawer()}
        icon={notification}
        onActionPressed={() => navigation.push('PatientAlerts', {isBack: true})}
        count={alertCount}
      />
      <ScrollView>
        <DashboardCard
          // onPress={() => navigation.push('MyMedicines', {isBack: true})}
          img={myMedicine}
          label="Medications"
          onPress={() => navigation.push('AssignedMedicines', {isBack: true})}
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
