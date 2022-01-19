import React from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {back} from '../assets/assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../constants/fonts';

function ActionHeader({label, onPress, icon}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={back} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity>
        {label && <Text style={styles.txt}> {label} </Text>}
        {icon && <Image source={icon} style={styles.img} />}
      </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  img: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  txt: {
    marginTop: 5,
    marginRight: 10,
    color: colors.MAIN,
    fontFamily: fonts.poppinsSemiBold,
    fontSize: hp('3%'),
  },
});
export default ActionHeader;
