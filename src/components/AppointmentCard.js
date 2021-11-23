import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {WIDTH} from '../constants/sizes';

function AppointmentCard(props) {
  return (
    <View style={styles.container}>
      <Text>Appointment Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    height: 100,
    backgroundColor: '#fff',
  },
});

export default AppointmentCard;
