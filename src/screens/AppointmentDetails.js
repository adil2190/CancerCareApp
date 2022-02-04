import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
import {deleteIcon} from '../assets/assets';
import moment from 'moment';

function AppointmentDetails({navigation, route}) {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <ActionHeader onPress={() => navigation.goBack()} icon={deleteIcon} />
      <View style={styles.innerContainer}>
        <Text style={styles.headingTxt}>Dr. {data.doctorName}</Text>

        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Title </Text>
          <Text style={styles.normalTxt}> {data.title} </Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Date </Text>
          <Text style={styles.normalTxt}>
            {' '}
            {moment(data.date).format('Do, MMM')}{' '}
          </Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Timing </Text>
          <Text style={styles.normalTxt}>
            {' '}
            {`${moment(data.startTime).format('h:mm A')}-${moment(
              data.endTime,
            ).format('h:mm A')}`}{' '}
          </Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Alert </Text>
          <Text style={styles.normalTxt}> {data.alert} </Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Notes </Text>
          <Text style={styles.normalTxt}> {data.notes.trim()} </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  innerContainer: {
    padding: 20,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    color: colors.DARK,
    fontFamily: fonts.poppinsRegular,
  },
  txtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTxt: {
    color: colors.MAIN,
    fontFamily: fonts.poppinsBold,
    fontSize: 20,
  },
  lablTxt: {
    color: colors.DARK,
    fontFamily: fonts.poppinsBold,
    fontSize: 20,
    marginRight: 10,
    marginVertical: 7,
  },
  normalTxt: {
    color: colors.DARK,
    fontFamily: fonts.poppinsMedium,
    fontSize: 15,
  },
});

export default AppointmentDetails;
