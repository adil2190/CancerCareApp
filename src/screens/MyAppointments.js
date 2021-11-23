import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';

function MyAppointments(props) {
  return (
    <View style={styles.container}>
      <BackHeader label="My Appointments" />
      <View style={styles.cardContainer}>
        <AppointmentCard />
      </View>
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

export default MyAppointments;
