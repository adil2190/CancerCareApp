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

function PatientAlerts({navigation, route}) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const subscribe = firestore()
      .collection(collectionNames.patientAlerts)
      .onSnapshot(querySnapshot => {
        let localData = [];
        querySnapshot.forEach(doc => {
          localData.push({...doc.data(), selfId: doc.id});
        });
        setData(localData);
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="Patient Alerts"
        />
      ) : (
        <DashboardHeader
          label="Patient Alerts"
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
                navigation.push('DietAlertDetails', {data: item});
                await updateDocument(
                  collectionNames.patientAlerts,
                  item.selfId,
                  {isRead: true},
                );
              }}
              note={item.patientName}
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

export default PatientAlerts;
