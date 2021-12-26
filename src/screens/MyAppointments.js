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
        />
        <AppointmentCard
          name="Dr. Sufyan"
          day="MONDAY"
          date="10th, July"
          time="4:00 PM - 6:00 PM"
        />
        <AppointmentCard
          name="Dr. Sufyan"
          day="MONDAY"
          date="10th, July"
          time="4:00 PM - 6:00 PM"
        />
        <MyButton
          onPress={() => navigation.push('AddNewAppointments')}
          label="Add new appointment"
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

export default MyAppointments;
