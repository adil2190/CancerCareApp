import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {WIDTH} from '../constants/sizes';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';

function MedicineCard({name, duration, totalDuration}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.durationS}>{duration}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.day}>{totalDuration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
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
  right: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: fonts.poppinsBold,
    fontSize: 20,
    color: colors.DARK,
  },
  durationS: {
    fontSize: 14,
    color: colors.DARK,
  },
  day: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 14,
    color: colors.MAIN,
  },
});

export default MedicineCard;
