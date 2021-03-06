import React, {useState} from 'react';
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
import {getSingleDoc, signInUser} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
function LoginScreen({navigation}) {
  const {setPatientData} = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loader, setLoader] = useState(false);

  const onSubmit = async () => {
    if (email && Password) {
      setLoader(true);
      try {
        const user = await signInUser(email, Password);
        const patient = await getSingleDoc(
          collectionNames.patients,
          user.message.user.uid,
        );
        if (patient.message) {
          setErrors('');
          await AsyncStorage.setItem('userId', patient.message.userId);
          setPatientData(patient.message);
          navigation.replace('AppNavigator');
        } else {
          setErrors('User is not registered as patient');
        }
      } catch (err) {
        setErrors(err.message.message);
      } finally {
        setLoader(false);
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
          placeholder="Username"
          placeholderTextColor={colors.LIGHTGRAY}
        />
        <InputField
          value={Password}
          onChangeText={val => setPassword(val)}
          icon={password}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.LIGHTGRAY}
        />

        <MyButton
          buttonStyle={{marginVertical: hp('2.8%')}}
          label="Log in"
          loading={loader}
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
export default LoginScreen;
