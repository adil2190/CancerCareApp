import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {WIDTH} from '../constants/sizes';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';

function AppointmentCard({name, day, date, time}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.day}> {day} </Text>
        <Text style={styles.date}> {date} </Text>
        <Text style={styles.time}> {time} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    marginVertical: 10,
  },
  left: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  right: {flex: 1, paddingVertical: 10, alignItems: 'center'},
  name: {
    fontFamily: fonts.poppinsBold,
    fontSize: hp('2.6%'),
    color: colors.DARK,
  },
  day: {
    fontFamily: fonts.poppinsBold,
    fontSize: hp('2.6%'),
    color: colors.MAIN,
  },
  date: {
    fontFamily: fonts.poppinsMedium,
    fontSize: hp('2.3%'),
    color: colors.DARK,
  },
  time: {
    fontFamily: fonts.poppinsRegular,
    fontSize: hp('1.9%'),
    color: colors.DARK,
  },
});

export default AppointmentCard;
