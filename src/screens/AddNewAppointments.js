import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
import {getCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {useFocusEffect} from '@react-navigation/native';
import Dropdown from '../components/Dropdown';
import MainModal from '../components/MainModal';
import {useState} from 'react';
import PatientModal from '../components/PatientModal';

function AddNewAppointments({navigation}) {
  const [openModal, setOpenModal] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [data, setData] = useState({
    patient: '',
    title: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    alert: '',
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <ActionHeader
          onActionPressed={() => console.log(data)}
          onPress={() => navigation.goBack()}
          label={'Done'}
        />
        <Text style={styles.txt}>New Appointments</Text>
        <Dropdown
          onPress={() => setOpenModal(true)}
          label={'Patient'}
          fullWidth={true}
        />
        <InputFieldMin
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
        <InputFieldMin
          placeholder="Alert"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <Text style={styles.smallTxt}> NOTES </Text>
        <InputFieldMin fullWidth={true} multiline={true} numberOfLines={8} />
      </View>

      {openModal && (
        <PatientModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          data={patientData}
          onSubmit={val => {
            console.log(val);
            setOpenModal(false);
          }}
        />
      )}
      {openDate && (
        <DatePicker
          modal
          open={openDate}
          date={date}
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
          date={startTime}
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
          date={endTime}
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
