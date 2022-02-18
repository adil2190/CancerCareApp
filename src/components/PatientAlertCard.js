import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {WIDTH} from '../constants/sizes';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';

function PatientAlertCard({note, message, isRead, ...props}) {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View
        style={
          isRead ? styles.main : [styles.main, {backgroundColor: colors.MAIN}]
        }>
        {note && (
          <Text
            style={isRead ? styles.name : [styles.name, {color: colors.WHITE}]}>
            {note}{' '}
          </Text>
        )}
        <Text
          style={isRead ? styles.date : [styles.date, {color: colors.WHITE}]}>
          {message.trim()}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 4,
    marginVertical: 10,
  },
  main: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: hp('2.6%'),
    color: colors.DARK,
  },

  date: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 13,
    paddingHorizontal: 8,
    color: colors.MAIN,
  },
});

export default PatientAlertCard;
