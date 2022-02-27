import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import {useState, useCallback} from 'react';
import {
  getAppointments,
  getPatientAppointments,
  getSingleDoc,
} from '../services/firestoreService';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collectionNames} from '../constants/collections';

function MyAppointments({navigation, route}) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      setLoader(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = (await getPatientAppointments(userId)) || [];
      // console.log(response.message);
      if (response.message.length) {
        const docResponse = await getSingleDoc(
          collectionNames.doctors,
          response.message[0].doctorId,
        );
        console.log(docResponse.message);
        setDoctorName(docResponse.message.fullName);
      }

      setData(response.message);
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setLoader(false);
    }
  };

  const appointmentsData = [
    {label: 'Title', value: 'Test Title', id: 1},
    {label: 'Date', value: 'Test Date', id: 2},
    {label: 'Timing', value: 'Test Timing', id: 3},
    {label: 'Alert', value: 'Test Alert', id: 4},
    {label: 'Notes', value: 'Test Notes', id: 5},
  ];
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="My Appointments"
        />
      ) : (
        <DashboardHeader
          label="My Appointments"
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
            <AppointmentCard
              name={`Dr. ${doctorName}`}
              day={moment(item.date).format('dddd')}
              date={moment(item.date).format('Do, MMM')}
              time={`${moment(item.startTime).format('h:mm A')}-${moment(
                item.endTime,
              ).format('h:mm A')}`}
              onPress={() =>
                navigation.push('AppointmentDetails', {
                  data: {...item, doctorName},
                })
              }
            />
          ))}

          <MyButton
            onPress={() => navigation.push('AddNewAppointmentPatient')}
            label="Request New Appointment"
            buttonStyle={{marginTop: 20}}
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

export default MyAppointments;
