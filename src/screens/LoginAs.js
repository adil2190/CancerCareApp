import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {doctor, patient, logo} from '../assets/assets';
import MyButton from '../components/MyButton';

function LoginAs({navigation}) {
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={logo} style={styles.img} />
        <View style={styles.imgContainer}>
          <Image source={doctor} style={styles.img} />
          <MyButton
            label={'Login as Doctor'}
            buttonStyle={{marginTop: 10, paddingVertical: 8}}
            onPress={() => navigation.navigate('DoctorNavigator')}
          />
        </View>
        <View style={styles.imgContainer}>
          <Image source={patient} style={styles.img} />
          <MyButton
            label={'Login as Patient'}
            buttonStyle={{marginTop: 10, paddingVertical: 8}}
            onPress={() => navigation.navigate('AppNavigator')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    marginTop: hp('8%'),
    height: hp('18%'),
    width: hp('18%'),
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '90%',
    alignItems: 'center',
  },
});
export default LoginAs;
