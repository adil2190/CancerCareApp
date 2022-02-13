import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
import {deleteIcon} from '../assets/assets';
import moment from 'moment';

function DietAlertDetails({navigation, route}) {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <ActionHeader onPress={() => navigation.goBack()} icon={deleteIcon} />
      <View style={styles.innerContainer}>
        <Text style={styles.headingTxt}>{data?.patientName}</Text>

        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Breakfast </Text>
          <Text style={styles.normalTxt}> {data?.breakfast} </Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Lunch </Text>
          <Text style={styles.normalTxt}>{data?.lunch}</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Dinner </Text>
          <Text style={styles.normalTxt}> {data?.dinner} </Text>
        </View>

        <View style={styles.txtContainer}>
          <Text style={styles.lablTxt}> Date </Text>
          <Text style={styles.normalTxt}>
            {' '}
            {moment(data.createdAt).format('Do, MMM')}{' '}
          </Text>
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
    alignItems: 'flex-start',
    width: '90%',
    marginVertical: 10,
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
    width: '40%',
  },
  normalTxt: {
    color: colors.DARK,
    fontFamily: fonts.poppinsMedium,
    fontSize: 15,
    width: '60%',
  },
});

export default DietAlertDetails;
