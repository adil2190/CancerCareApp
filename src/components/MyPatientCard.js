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

function MyPatientCard({name, ...otherProps}) {
  return (
    <TouchableOpacity {...otherProps} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
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
    flexDirection: 'row',
    marginVertical: 10,
  },
  left: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.poppinsBold,
    fontSize: hp('2.6%'),
    color: colors.DARK,
  },
});

export default MyPatientCard;
