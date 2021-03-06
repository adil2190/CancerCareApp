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
  getCollection,
  getSubCollection,
  updateDocument,
} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import PatientAlertCard from '../components/PatientAlertCard';
import {AuthContext} from '../context/AuthContext';

function DoctorAlerts({navigation, route}) {
  const {patientData} = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const subscribe = firestore()
      .collection('DoctorAlerts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        console.log(querySnapshot);
        let localData = [];
        querySnapshot.forEach(doc => {
          localData.push({...doc.data(), selfId: doc.id});
        });
        setData(localData.filter(item => item.patientId == patientData.userId));
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="Doctor Alerts" />
      ) : (
        <DashboardHeader
          label="Doctor Alerts"
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
            <PatientAlertCard
              // onPress={() => navigation.push('NoteDetails', {data: item})}
              onPress={async () => {
                await updateDocument('DoctorAlerts', item.selfId, {
                  isRead: true,
                });
              }}
              message={item.message}
              isRead={item.isRead}
            />
          ))}
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

export default DoctorAlerts;
