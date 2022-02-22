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

import ActionHeader from '../components/ActionHeader';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import InputFieldMin from '../components/InputFieldMin';
import Dropdown from '../components/Dropdown';
import {useState} from 'react';
import MainModal from '../components/MainModal';
import {addInSubcollection, getCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import PatientModal from '../components/PatientModal';
const unitsData = [
  {name: 'mL', id: 1},
  {name: 'tablets', id: 2},
  {name: 'capsules', id: 3},
  {name: 'teaspoons', id: 4},
  {name: 'tablespoons', id: 5},
  {name: 'drops', id: 6},
];

const frequencyData = [
  {name: 'As Needed', id: 1},
  {name: 'Every Hour', id: 2},
  {name: 'Every 2 Hours', id: 3},
  {name: 'Once a Day', id: 4},
  {name: 'Twice a Day', id: 5},
  {name: 'Three Times a Day', id: 6},
  {name: 'Four Times a day', id: 7},
  {name: 'Once a Week', id: 8},
  {name: 'Once a Month', id: 9},
];

function AddMedicineDoctor({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [patientModal, setPatientModal] = useState(false);
  const [frequencyVisible, setFrequencyVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    medicineName: '',
    purpose: '',
    dose: '',
    units: '',
    frequency: '',
    days: '',
    notes: '',
    patientId: '',
    patientName: '',
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
    data.medicineName &&
    data.dose &&
    data.units &&
    data.frequency &&
    data.days &&
    data.patientId &&
    data.patientName;
  const assignMedicine = async () => {
    if (isValid) {
      try {
        setLoader(true);
        const userId = await AsyncStorage.getItem('userId');
        await addInSubcollection(
          collectionNames.patients,
          data.patientId,
          collectionNames.medicines,
          data,
        );
        navigation.goBack();
      } catch (err) {
        console.log(err);
        Alert.alert('Error!', err.message);
      } finally {
        setLoader(false);
      }
    } else {
      Alert.alert('Validation Error!', 'Please fill all the required fields!');
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ActionHeader
          isDisabled={loader}
          onPress={() => navigation.goBack()}
          label={'Assign'}
          onActionPressed={assignMedicine}
        />
        <Text style={styles.txt}>Add Medicine</Text>
        <Dropdown
          onPress={() => setPatientModal(true)}
          label={data.patientName ? data.patientName : 'Patient'}
          fullWidth={true}
        />
        <InputFieldMin
          value={data.medicineName}
          onChangeText={val => setData({...data, medicineName: val})}
          placeholder="Medicine Name"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <InputFieldMin
          value={data.purpose}
          onChangeText={val => setData({...data, purpose: val})}
          placeholder="Purpose"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.halfWidth}>
            <InputFieldMin
              keyboardType="number-pad"
              value={data.dose}
              onChangeText={val => setData({...data, dose: val})}
              placeholder="Dose"
              placeholderTextColor={colors.LIGHTGRAY}
              fullWidth={true}
            />
          </View>
          <View style={styles.halfWidth}>
            <Dropdown
              onPress={() => setModalVisible(true)}
              label={data.units ? data.units : 'Units'}
              fullWidth={true}
            />
          </View>
        </View>
        <Dropdown
          onPress={() => setFrequencyVisible(true)}
          label={data.frequency ? data.frequency : 'Frequency'}
          fullWidth={true}
        />

        <InputFieldMin
          keyboardType="number-pad"
          value={data.days}
          onChangeText={val => setData({...data, days: val})}
          placeholder="Days"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <Text style={styles.smallTxt}> NOTES </Text>
        <InputFieldMin
          textAlignVertical="top"
          value={data.notes}
          onChangeText={val => setData({...data, notes: val})}
          fullWidth={true}
          multiline={true}
          numberOfLines={8}
        />
      </View>

      {patientModal && (
        <PatientModal
          visible={patientModal}
          onClose={() => setPatientModal(false)}
          data={patientData}
          onSubmit={val => {
            console.log(val);
            setData({
              ...data,
              patientId: val.userId,
              patientName: val.fullName,
            });
            setPatientModal(false);
          }}
        />
      )}
      <MainModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={val => {
          setData({...data, units: val});
          setModalVisible(false);
        }}
        data={unitsData}
      />
      <MainModal
        visible={frequencyVisible}
        onClose={() => setFrequencyVisible(false)}
        onSubmit={val => {
          setData({...data, frequency: val});
          setFrequencyVisible(false);
        }}
        data={frequencyData}
      />
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

export default AddMedicineDoctor;
