import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from '../constants/colors';
import BackHeader from '../components/BackHeader';
import DashboardHeader from '../components/DashboardHeader';
import {fonts} from '../constants/fonts';
import DietCard from '../components/DietCard';
import {useState} from 'react';
import {addSingleDoc, getSingleDoc} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import MyButton from '../components/MyButton';

function Diet({navigation, route}) {
  const [breakfastSelected, setBreakfastSelected] = useState('');
  const [lunchSelected, setLunchSelected] = useState('');
  const [dinnerSelected, setDinnerSelected] = useState('');
  const [selfData, setSelfData] = useState({});
  const [submitLoader, setSubmitLoader] = useState(false);
  const [data, setData] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [alertData, setAlertData] = useState({
    message: '',
    patientName: '',
    breakfast: '',
    lunch: '',
    dinner: '',
  });
  const [loader, setLoader] = useState(true);
  const currentDay = moment(new Date()).format('dddd');
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      setLoader(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await getSingleDoc(collectionNames.diet, currentDay);
      const self = await getSingleDoc(collectionNames.patients, userId);
      console.log(self.message);
      setData({
        breakfast: response.message.breakfast,
        lunch: response.message.lunch,
        dinner: response.message.dinner,
      });
      setSelfData(self.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const isValid = breakfastSelected && lunchSelected && dinnerSelected;

  const dietData = {
    message: `Patient ${
      selfData.fullName
    } submitted their diet on ${currentDay}, ${moment(new Date()).format(
      'DD MMM, YYYY',
    )} at ${moment(new Date()).format('H:mm A')}`,
    patientName: `${selfData.fullName} (${selfData.code})`,
    breakfast: breakfastSelected,
    lunch: lunchSelected,
    dinner: dinnerSelected,
    createdAt: Date.now(),
    isRead: false,
    doctorId: selfData.doctorId,
    type: 'diet',
  };
  const submitData = async () => {
    try {
      if (isValid) {
        setSubmitLoader(true);
        await addSingleDoc(collectionNames.patientAlerts, dietData);
        navigation.goBack();
      } else {
        Alert.alert(
          'Validation Error!',
          'Please select all the required options.',
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    } finally {
      setSubmitLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="My Diet" />
      ) : (
        <DashboardHeader
          label="My Diet"
          onPressed={() => navigation.openDrawer()}
        />
      )}
      <Text style={styles.dietHeading}>{currentDay}</Text>
      {loader ? (
        <ActivityIndicator size={'large'} color={colors.MAIN} />
      ) : (
        <ScrollView>
          <DietCard
            title={'Breakfast'}
            data={data.breakfast}
            onSelect={val => setBreakfastSelected(val)}
            selected={breakfastSelected}
          />
          <DietCard
            title={'Lunch'}
            data={data.lunch}
            onSelect={val => setLunchSelected(val)}
            selected={lunchSelected}
          />
          <DietCard
            title={'Dinner'}
            data={data.dinner}
            onSelect={val => setDinnerSelected(val)}
            selected={dinnerSelected}
          />
          <MyButton
            onPress={submitData}
            label={'Submit'}
            loading={submitLoader}
            buttonStyle={{marginBottom: 15}}
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
  dietHeading: {
    color: colors.MAIN,
    padding: 15,
    fontSize: 20,
    fontFamily: fonts.poppinsBold,
  },
});
export default Diet;
