import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {username, password} from '../assets/assets';
import {colors, DARK, WHITE} from '../constants/colors';

function InputField({icon, fullWidth, ...otherProps}) {
  return (
    <View
      style={
        fullWidth ? [styles.container, {width: '100%'}] : styles.container
      }>
      <Image source={icon} style={styles.image} />
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
    borderWidth: 2,
    borderColor: colors.MAIN,
    width: 100,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    width: '90%',
    padding: 5,
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    color: colors.DARK,
    fontSize: hp('2.2%'),
    paddingTop: 10,
    paddingBottom: 8,
    padding: 0,
    fontFamily: 'Poppins-Medium',
  },
});

export default InputField;
