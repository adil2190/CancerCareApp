import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {collectionNames} from '../constants/collections';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {getSubCollection} from '../services/firestoreService';

function PatientCards({data}) {
  const [medicines, setMedicines] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      const response = await getSubCollection(
        collectionNames.patients,
        data.userId,
        collectionNames.medicines,
      );
      console.log(response.message);
      setMedicines(response.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>
          {' '}
          {data.fullName} ({data.code}){' '}
        </Text>
      </View>
      <View style={styles.dataWrapper}>
        {medicines.map(item => (
          <View style={styles.dataContainer}>
            <Text style={styles.dataTxtLabel}>{item.medicineName}</Text>
            <Text style={styles.dataTxtValue}>{item.frequency}</Text>
          </View>
        ))}
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
