import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {colors} from '../constants/colors';
import {myAppointments} from '../assets/assets';
import {fonts} from '../constants/fonts';

function DashboardCard({img, label, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.left}>
        <Image source={img} style={styles.img} />
      </View>
      <View style={styles.right}>
        <Text style={styles.txt}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 4,
    flexDirection: 'row',
    marginVertical: 10,
  },
  img: {
    resizeMode: 'contain',
    height: 110,
    width: 130,
    marginHorizontal: 15,
  },
  left: {
    paddingLeft: 20,
    // backgroundColor: '#333',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  txt: {
    fontFamily: fonts.poppinsBold,
    fontSize: wp('5%'),
    color: colors.MAIN,
  },
});

export default DashboardCard;
