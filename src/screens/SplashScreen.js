import React from 'react';
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
import {MAIN} from '../constants/colors';

function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>Cancer Care App</Text>
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
  image: {
    marginLeft: '10%',
    height: hp('35%'),
    width: hp('35%'),
    resizeMode: 'contain',
  },
  text: {
    color: '#000',
    fontFamily: 'Poppins-Black',
  },
});
export default SplashScreen;
