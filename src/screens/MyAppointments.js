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

function MyAppointments({navigation, route}) {
  const appointmentsData = [
    {label: 'Title', value: 'Test Title', id: 1},
    {label: 'Date', value: 'Test Date', id: 2},
    {label: 'Timing', value: 'Test Timing', id: 3},
    {label: 'Alert', value: 'Test Alert', id: 4},
    {label: 'Notes', value: 'Test Notes', id: 5},
  ];
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="My Appointments"
        />
      ) : (
        <DashboardHeader
          label="My Appointments"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <AppointmentCard
          name="Dr. Sufyan"
          day="MONDAY"
          date="10th, July"
          time="4:00 PM - 6:00 PM"
          onPress={() =>
            navigation.push('AppointmentDetails', {
              data: appointmentsData,
            })
          }
        />
        <AppointmentCard
          name="Dr. Sufyan"
          day="MONDAY"
          date="10th, July"
          time="4:00 PM - 6:00 PM"
          onPress={() =>
            navigation.push('AppointmentDetails', {
              data: appointmentsData,
            })
          }
        />
        <AppointmentCard
          name="Dr. Sufyan"
          day="MONDAY"
          date="10th, July"
          time="4:00 PM - 6:00 PM"
          onPress={() =>
            navigation.push('AppointmentDetails', {
              data: appointmentsData,
            })
          }
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

export default MyAppointments;
