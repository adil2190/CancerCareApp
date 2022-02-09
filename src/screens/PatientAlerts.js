import React, {useCallback} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import MyButton from '../components/MyButton';
import NotesCard from '../components/NotesCard';
import DashboardHeader from '../components/DashboardHeader';

import {colors} from '../constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import {getCollection, getSubCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import PatientAlertCard from '../components/PatientAlertCard';

function PatientAlerts({navigation, route}) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  const getData = async () => {
    try {
      setLoader(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await getCollection(collectionNames.patientAlerts);
      setData(response.message);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', err.message);
    } finally {
      setLoader(false);
    }
  };

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
              note={item.patientName}
              message={item.message}
              isRead={item.isRead}
            />
          ))}

          <MyButton
            onPress={() => navigation.push('AddNote')}
            label="Add new note"
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

export default PatientAlerts;
