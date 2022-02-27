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
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import {useState} from 'react';
import {getAppointments} from '../services/firestoreService';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DoctorAppointment({navigation, route}) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      setLoader(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await getAppointments(userId);
      // console.log(response.message);
      setData(response.message);
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setLoader(false);
    }
  };

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
            <>
              <AppointmentCard
                name={item.patientName}
                day={moment(item.date).format('dddd')}
                date={moment(item.date).format('Do, MMM')}
                time={`${moment(item.startTime).format('h:mm A')}-${moment(
                  item.endTime,
                ).format('h:mm A')}`}
              />
            </>
          ))}

          {/* <MyButton
            onPress={() => navigation.push('AddNewAppointments')}
            label="Add new appointment"
            buttonStyle={{marginTop: 20}}
          /> */}
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

export default DoctorAppointment;
