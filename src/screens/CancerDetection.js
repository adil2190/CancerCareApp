import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import {doctor, patient, logo} from '../assets/assets';

function CancerDetection({navigation, route}) {
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="AI Cancer Detection"
        />
      ) : (
        <DashboardHeader
          label="AI Cancer Detection"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.imgContainer}>
            {/* <Image source={doctor} style={styles.img} /> */}
            <View style={styles.round}></View>
            <MyButton
              label={'Upload File'}
              buttonStyle={{marginTop: 10, paddingVertical: 8}}
              // onPress={() => navigation.navigate('DoctorNavigator')}
            />
          </View>
          <View style={styles.imgContainer}>
            <View style={styles.round}></View>

            {/* <Image source={patient} style={styles.img} /> */}
            <MyButton
              label={'Take a Picture'}
              buttonStyle={{marginTop: 10, paddingVertical: 8}}
              // onPress={() => navigation.navigate('AppNavigator')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  cardContainer: {
    alignItems: 'center',
  },
  round: {
    height: 140,
    width: 140,
    borderRadius: 10000,
    backgroundColor: colors.WHITE,
    marginTop: hp('8%'),
    elevation: 4,
  },
  img: {
    height: hp('18%'),
    width: hp('18%'),
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '90%',
    alignItems: 'center',
  },
});

export default CancerDetection;
