import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import BackHeader from '../components/BackHeader';
import {colors} from '../constants/colors';

function MyAppointments(props) {
  return (
    <View style={styles.container}>
      <BackHeader label="My Appointments" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
});

export default MyAppointments;
