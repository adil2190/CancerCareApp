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
import {MAIN} from '../constants/colors';

function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginAs');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>Cancer Care App</Text>
      </View>
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
    // marginLeft: '10%',
    height: hp('30%'),
    width: hp('30%'),
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // backgroundColor: '#999',
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('3%'),
    marginVertical: -6,
  },
});
export default SplashScreen;
