import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logo} from '../assets/assets';
import {colors, MAIN} from '../constants/colors';

function AccountCreated({navigation}) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('AppNavigator');
  //   }, 1000);
  // }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Account is Created</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // backgroundColor: '#999',
    color: colors.MAIN,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('5%'),
  },
});
export default AccountCreated;
