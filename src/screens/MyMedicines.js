import React, {useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import BackHeader from '../components/BackHeader';
import MedicineCard from '../components/MedicineCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import {useFocusEffect} from '@react-navigation/native';
import {
  getSubCollection,
  getSingleDoc,
  addSingleDoc,
} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import moment from 'moment';

function MyMedicines({navigation, route}) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selfData, setSelfData] = useState({});
  const [submitLoader, setSubmitLoader] = useState(false);
  const currentDay = moment(new Date()).format('dddd');

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      setLoader(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await getSubCollection(
        collectionNames.patients,
        userId,
        collectionNames.medicines,
      );
      const self = await getSingleDoc(collectionNames.patients, userId);
      setSelfData(self.message);
      setData(response.message);
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setLoader(false);
    }
  };

  const alertData = {
    type: 'medicine',
    isRead: false,
    patientName: `${selfData.fullName} (${selfData.code})`,
    doctorId: selfData.doctorId,
    createdAt: Date.now(),
    patientId: selfData.userId,
    message: `Patient ${
      selfData.fullName
    } submitted their ${currentDay}'s medicines on ${moment(new Date()).format(
      'DD MMM, YYYY',
    )} at ${moment(new Date()).format('H:mm A')} `,
  };

  const submitData = async () => {
    try {
      setSubmitLoader(true);
      await addSingleDoc(collectionNames.patientAlerts, alertData);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setSubmitLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="My Medicines" />
      ) : (
        <DashboardHeader
          label="My Medicines"
          onPressed={() => navigation.openDrawer()}
        />
      )}
      {loader ? (
        <ActivityIndicator size={'large'} color={colors.MAIN} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}>
          {data.map(item => (
            <MedicineCard
              name={item.medicineName}
              totalDuration={`${item.days} Days`}
              duration={`${item.dose} ${item.units}, ${item.frequency}`}
            />
          ))}

          <MyButton
            onPress={() => navigation.push('AddMedicine')}
            label="Add new Medicine"
            buttonStyle={{marginTop: 20}}
          />
          <MyButton
            onPress={submitData}
            loading={submitLoader}
            label="Submit to Notify"
            buttonStyle={{marginTop: 10}}
          />
        </ScrollView>
      )}
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
});

export default MyMedicines;
