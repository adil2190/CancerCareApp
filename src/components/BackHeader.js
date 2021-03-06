import React from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {back} from '../assets/assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function BackHeader({label, isBack, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={back} style={styles.img} />
      </TouchableOpacity>
      <Text style={styles.txt}> {label} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: '100%',
    backgroundColor: colors.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  txt: {
    marginTop: 5,
    color: colors.MAIN,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('3%'),
  },
});
export default BackHeader;
