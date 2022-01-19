import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';

function PatientCards(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Patient Name: Ali</Text>
      </View>
      <View style={styles.dataWrapper}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataTxtLabel}>Panadol</Text>
          <Text style={styles.dataTxtValue}>3 times a day</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataTxtLabel}>Panadol</Text>
          <Text style={styles.dataTxtValue}>3 times a day</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataTxtLabel}>Panadol</Text>
          <Text style={styles.dataTxtValue}>3 times a day</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15,
  },
  header: {
    backgroundColor: colors.MAIN,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTxt: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 16,
    color: colors.WHITE,
  },
  dataWrapper: {
    elevation: 2,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: '#999',
    borderTopWidth: 1,
  },
  dataTxtLabel: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 14,
    color: colors.DARK,
  },
  dataTxtValue: {
    fontFamily: fonts.poppinsMedium,
    fontSize: 14,
    color: colors.DARK,
    flexWrap: 'wrap',
    width: '40%',
  },
});
export default PatientCards;
