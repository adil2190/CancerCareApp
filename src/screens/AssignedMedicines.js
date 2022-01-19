import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import PatientCards from '../components/PatientCards';

function AssignedMedicines({navigation, route}) {
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="Assigned Medicines"
        />
      ) : (
        <DashboardHeader
          label="Assigned Medicines"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <PatientCards />
        <PatientCards />
        <PatientCards />
        <MyButton
          onPress={() => navigation.push('AddMedicine')}
          label="Add new Medicine"
          buttonStyle={{marginTop: 20}}
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
  cardContainer: {
    alignItems: 'center',
  },
});

export default AssignedMedicines;
