import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputField from '../components/InputField';
import {username, password, logo} from '../assets/assets';
import {colors} from '../constants/colors';

function LoginScreen(props) {
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={logo} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Welcome</Text>
          <Text style={styles.subText}>Sign in to continue</Text>
        </View>
        <InputField
          icon={username}
          placeholder="Username"
          placeholderTextColor={colors.DARK}
        />
        <InputField
          icon={password}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.DARK}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: hp('8%'),
    height: hp('18%'),
    width: hp('18%'),
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: hp('7%'),
    marginBottom: hp('5%'),
    alignItems: 'center',
  },
  boldText: {
    color: colors.MAIN,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('5%'),
  },
  subText: {
    marginTop: -13,
    color: colors.DARK,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
});
export default LoginScreen;
