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

const data = [
  {id: 1, name: 'test'},
  {id: 2, name: 'test'},
  {id: 3, name: 'test'},
  {id: 4, name: 'test'},
  {id: 5, name: 'test'},
  {id: 6, name: 'test'},
  {id: 7, name: 'test'},
  {id: 8, name: 'test'},
  {id: 9, name: 'test'},
  {id: 10, name: 'test'},
  {id: 11, name: 'test'},
  {id: 12, name: 'test'},
  {id: 13, name: 'test'},
  {id: 14, name: 'test'},
  {id: 15, name: 'test'},
  {id: 16, name: 'test'},
  {id: 17, name: 'test'},
];

function AddNewAppointments({navigation}) {
  const [openModal, setOpenModal] = useState(false);
  const [patientData, setPatientData] = useState([]);
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
        <ActionHeader onPress={() => navigation.goBack()} label={'Done'} />
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
        <Dropdown label={'Date'} fullWidth={true} />

        <View style={{flexDirection: 'row'}}>
          <View style={styles.halfWidth}>
            <Dropdown label={'Start Time'} fullWidth={true} />
          </View>
          <View style={styles.halfWidth}>
            <Dropdown label={'End Time'} fullWidth={true} />
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
