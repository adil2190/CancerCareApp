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

function NotesCard({note, date, ...props}) {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.name}> {note} </Text>
        <Text style={styles.date}> {date} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('85%'),
    backgroundColor: '#fff',
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
    fontFamily: fonts.poppinsBold,
    fontSize: hp('2.6%'),
    color: colors.DARK,
  },

  date: {
    fontFamily: fonts.poppinsMedium,
    fontSize: hp('2.3%'),
    color: colors.DARK,
  },
});

export default NotesCard;
