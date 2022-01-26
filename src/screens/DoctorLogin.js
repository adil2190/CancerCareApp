import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputField from '../components/InputField';
import {username, password, logo} from '../assets/assets';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import BackHeader from '../components/BackHeader';
import {fonts} from '../constants/fonts';
import {useState} from 'react';
import {getSingleDoc, signInUser} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DoctorLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const onSubmit = async () => {
    if (email && Password) {
      try {
        const user = await signInUser(email, Password);
        // console.log(user.message.user);
        const doctor = await getSingleDoc(
          collectionNames.doctors,
          user.message.user.uid,
        );
        console.log(doctor.message);
        if (doctor) {
          console.log('in doctor', doctor.message.userId);
          setErrors('');
          await AsyncStorage.setItem('userId', doctor.message.userId);
        } else {
          setErrors('User is not registered as doctor');
        }
      } catch (err) {
        setErrors(err.message.message);
      }
    } else {
      setErrors('Please fill all the required fields.');
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={logo} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Welcome</Text>
          <Text style={styles.subText}>Sign in to continue</Text>
        </View>
        <InputField
          value={email}
          onChangeText={val => setEmail(val)}
          icon={username}
          placeholder="Email"
          placeholderTextColor={colors.LIGHTGRAY}
        />
        <InputField
          icon={password}
          onChangeText={val => setPassword(val)}
          value={Password}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.LIGHTGRAY}
        />

        <MyButton
          buttonStyle={{marginVertical: hp('2.8%')}}
          label="Log in"
          // onPress={() => navigation.replace('DoctorDrawer')}
          onPress={onSubmit}
        />

        {errors ? <Text style={styles.errTxt}> {errors} </Text> : null}
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
  normalTxt: {
    color: '#666',
    fontFamily: fonts.poppinsRegular,
  },
  boldTxt: {color: '#666', fontFamily: fonts.poppinsSemiBold},
  subText: {
    marginTop: -13,
    color: colors.DARK,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
  errTxt: {
    color: colors.ERROR,
  },
});
export default DoctorLogin;
