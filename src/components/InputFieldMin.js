import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {username, password} from '../assets/assets';
import {colors, DARK, WHITE} from '../constants/colors';
import {fonts} from '../constants/fonts';

function InputFieldMin({icon, fullWidth, ...otherProps}) {
  return (
    <View
      style={
        fullWidth ? [styles.container, {width: '100%'}] : styles.container
      }>
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // marginLeft: '10%',
    // padding: 5,
    marginBottom: 3,
    marginHorizontal: 5,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  container: {
    borderBottomWidth: 1,
    borderColor: colors.MAIN,
    width: 100,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    width: '90%',
    padding: 5,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    color: colors.DARK,
    fontSize: hp('2.2%'),
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 10,
    fontFamily: fonts.poppinsRegular,
  },
});

export default InputFieldMin;
