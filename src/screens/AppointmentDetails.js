import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
import {deleteIcon} from '../assets/assets';

function AppointmentDetails({navigation, route}) {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <ActionHeader onPress={() => navigation.goBack()} icon={deleteIcon} />
      <View style={styles.innerContainer}>
        <Text style={styles.headingTxt}>Dr. Sufyan</Text>
        {data.map(item => (
          <View key={item.id} style={styles.txtContainer}>
            <Text style={styles.lablTxt}> {item.label} </Text>
            <Text style={styles.normalTxt}> {item.value} </Text>
          </View>
        ))}
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
