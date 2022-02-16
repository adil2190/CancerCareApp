import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logo} from '../assets/assets';
import {collectionNames} from '../constants/collections';
import {getSingleDoc} from '../services/firestoreService';
import {AuthContext} from '../context/AuthContext';

function SplashScreen({navigation}) {
  const {setDoctorData} = React.useContext(AuthContext);
  useEffect(() => {
    getData();
    // setTimeout(() => {
    //   navigation.replace('LoginAs');
    // }, 1000);
  }, []);

  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const doctor = await getSingleDoc(collectionNames.doctors, userId);
        const patient = await getSingleDoc(collectionNames.patients, userId);
        if (doctor.message) {
          setDoctorData(doctor.message);
          navigation.replace('DoctorNavigator');
        } else if (patient.message) {
          navigation.replace('AppNavigator');
        } else {
          navigation.replace('LoginAs');
        }
      } else {
        navigation.replace('LoginAs');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    }
  };
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
