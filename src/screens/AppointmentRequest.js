import React, {useCallback, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import BackHeader from '../components/BackHeader';
import MyButton from '../components/MyButton';
import NotesCard from '../components/NotesCard';
import DashboardHeader from '../components/DashboardHeader';

import {colors} from '../constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import {
  addSingleDoc,
  deleteSingleDoc,
  getCollection,
  getSubCollection,
  updateDocument,
} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import PatientAlertCard from '../components/PatientAlertCard';
import {AuthContext} from '../context/AuthContext';

function AppointmentRequest({navigation, route}) {
  const {data} = route.params;
  const [acceptLoader, setAcceptLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);
  console.log(data);

  const alertData = {
    createdAt: Date.now().toString(),
    doctorId: data.doctorId,
    isRead: false,
    patientId: data.patientId,
  };
  const acceptRequest = async () => {
    try {
      setAcceptLoader(true);
      await addSingleDoc(collectionNames.appointments, data);
      await addSingleDoc('DoctorAlerts', {
        ...alertData,
        message: 'Your doctor accepted your appointment request.',
      });
      await deleteSingleDoc(collectionNames.patientAlerts, data.selfId);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    } finally {
      setAcceptLoader(false);
    }
  };

  const rejectRequest = async () => {
    try {
      setRejectLoader(true);
      await addSingleDoc('DoctorAlerts', {
        ...alertData,
        message: 'Your doctor rejected your appointment request.',
      });
      await deleteSingleDoc(collectionNames.patientAlerts, data.selfId);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    } finally {
      setRejectLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      <BackHeader
        onPress={() => navigation.goBack()}
        label="Appointment Request"
      />

      <MyButton
        onPress={acceptRequest}
        loading={acceptLoader}
        label="Accept Request"
        buttonStyle={{marginTop: 20}}
      />
      <MyButton
        onPress={rejectRequest}
        loading={rejectLoader}
        label="Reject Request"
        buttonStyle={{marginTop: 20, backgroundColor: 'red'}}
      />
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

export default AppointmentRequest;
