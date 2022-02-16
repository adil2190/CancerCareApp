import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
import {deleteIcon} from '../assets/assets';
import moment from 'moment';
import {getSubCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useState} from 'react';
import MedicineCard from '../components/MedicineCard';

function DietAlertDetails({navigation, route}) {
  const {data} = route.params;
  const [medicines, setMedicines] = useState([]);
  const getData = async () => {
    try {
      const response = await getSubCollection(
        collectionNames.patients,
        data.patientId,
        collectionNames.medicines,
      );
      console.log(response.message);
      setMedicines(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (data.type == 'medicine') {
        getData();
      }
    }, []),
  );
  return (
    <View style={styles.container}>
      <ActionHeader onPress={() => navigation.goBack()} />
      {data.type == 'diet' ? (
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
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.headingTxt}>{data?.patientName}</Text>
          <ScrollView
            contentContainerStyle={styles.cardContainer}
            showsVerticalScrollIndicator={false}>
            {medicines.map(item => (
              <MedicineCard
                name={item.medicineName}
                totalDuration={`${item.days} Days`}
                duration={`${item.dose} ${item.units}, ${item.frequency}`}
              />
            ))}
          </ScrollView>
        </View>
      )}
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
  cardContainer: {
    alignItems: 'center',
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
