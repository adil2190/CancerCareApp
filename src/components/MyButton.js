import React from 'react';
import {
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';

const WIDTH = Dimensions.get('window').width;

const MyButton = ({
  onPress,
  buttonStyle,
  buttonTextStyle,
  label,
  loading,
  buttonLoaderColor = 'white',
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, styles.btn]}
      {...props}>
      {loading ? (
        <ActivityIndicator color={buttonLoaderColor} />
      ) : (
        <Text style={[buttonTextStyle, styles.txt]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN,
    width: WIDTH * 0.85,
    alignSelf: 'center',
    borderRadius: 14,
    paddingVertical: hp('2%'),
  },
  txt: {
    color: colors.WHITE,
    fontSize: hp('2.6%'),
    fontFamily: fonts.poppinsSemiBold,
  },
});
export default MyButton;
