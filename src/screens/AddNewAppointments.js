import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import ActionHeader from '../components/ActionHeader';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import InputFieldMin from '../components/InputFieldMin';
import {addSingleDoc, getCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {useFocusEffect} from '@react-navigation/native';
import Dropdown from '../components/Dropdown';
import MainModal from '../components/MainModal';
import {useState} from 'react';
import PatientModal from '../components/PatientModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddNewAppointments({navigation}) {
  const [openModal, setOpenModal] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    patientName: '',
    patientId: '',
    title: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    notes: '',
  });
  useFocusEffect(
    useCallback(() => {
      getPatients();
    }, []),
  );
  const getPatients = async () => {
    try {
      const response = await getCollection(collectionNames.patients);
      console.log(response.message);
      setPatientData(response.message);
    } catch (err) {
      return console.log(err);
    }
  };

  const isValid =
    data.patientId &&
    data.patientName &&
    data.title &&
    data.date &&
    data.startTime &&
    data.endTime;

  const submitData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      setLoader(true);
      if (isValid) {
        await addSingleDoc(collectionNames.appointments, {
          ...data,
          doctorId: userId,
          startTime: Date.parse(data.startTime),
          endTime: Date.parse(data.endTime),
          date: Date.parse(data.date),
        });
        console.log('success');
        navigation.goBack();
      } else {
        Alert.alert(
          'Validation Error!',
          'Please fill all the required fields!',
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ActionHeader
          onActionPressed={submitData}
          onPress={() => navigation.goBack()}
          label={'Done'}
          isDisabled={loader}
        />
        <Text style={styles.txt}>New Appointments</Text>
        <Dropdown
          onPress={() => setOpenModal(true)}
          label={data.patientName ? data.patientName : 'Patient'}
          fullWidth={true}
        />
        <InputFieldMin
          value={data.title}
          onChangeText={val => setData({...data, title: val})}
          placeholder="Title"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <Dropdown
          onPress={() => setOpenDate(true)}
          label={moment(data.date).format('Do MMM YYYY')}
          fullWidth={true}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={styles.halfWidth}>
            <Dropdown
              onPress={() => setStartTimeOpen(true)}
              label={moment(data.startTime).format('hh:mm A')}
              fullWidth={true}
            />
          </View>
          <View style={styles.halfWidth}>
            <Dropdown
              onPress={() => setEndTimeOpen(true)}
              label={moment(data.endTime).format('hh:mm A')}
              fullWidth={true}
            />
          </View>
        </View>

        <Text style={styles.smallTxt}> NOTES </Text>
        <InputFieldMin
          value={data.notes}
          onChangeText={val => setData({...data, notes: val})}
          fullWidth={true}
          multiline={true}
          numberOfLines={8}
          textAlignVertical="top"
        />
      </View>

      {openModal && (
        <PatientModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          data={patientData}
          onSubmit={val => {
            console.log(val);
            setData({
              ...data,
              patientId: val.userId,
              patientName: val.fullName,
            });
            setOpenModal(false);
          }}
        />
      )}
      {openDate && (
        <DatePicker
          modal
          open={openDate}
          date={data.date}
          onConfirm={date => {
            setOpenDate(false);
            setData({...data, date: date});
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      )}
      {startTimeOpen && (
        <DatePicker
          modal
          mode="time"
          open={startTimeOpen}
          date={data.startTime}
          onConfirm={date => {
            setStartTimeOpen(false);
            setData({...data, startTime: date});
          }}
          onCancel={() => {
            setStartTimeOpen(false);
          }}
        />
      )}
      {endTimeOpen && (
        <DatePicker
          modal
          mode="time"
          open={endTimeOpen}
          date={data.endTime}
          onConfirm={date => {
            setEndTimeOpen(false);
            setData({...data, endTime: date});
          }}
          onCancel={() => {
            setEndTimeOpen(false);
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  txt: {
    fontFamily: fonts.poppinsBold,
    color: colors.MAIN,
    fontSize: hp('2.8%'),
    marginLeft: 20,
    marginBottom: 10,
  },
  halfWidth: {
    width: '50%',
  },
  smallTxt: {
    fontFamily: fonts.poppinsRegular,
    color: '#666',
    marginLeft: 20,
    marginVertical: 10,
    fontSize: hp('2.2%'),
  },
});

export default AddNewAppointments;
