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
import ExerciseCard from '../components/ExerciseCard';

const data = [
  {
    title: '1. Diaphragmatic breathing',
    data: 'Relax your shoulders and sit back or lie down.\nPlace one hand on your belly and one on your chest.\nInhale through your nose for two seconds, feeling the air move into your abdomen and feeling your stomach move out. Your stomach should move more than your chest does.\nBreathe out for two seconds through pursed lips while pressing on your abdomen.\nRepeat.',
  },
  {
    title: '2. Pursed-lips breathing',
    data: 'Inhale slowly through your nostrils.\nPurse your lips, as if pouting or about to blow on something.\nBreathe out as slowly as possible through pursed lips. This should take at least twice as long as it did to breathe in.\nRepeat.',
  },
  {
    title: '3. Walking',
    data: 'Walking is a great choice, especially if you’re just getting started. Do it anywhere -- outside, in a mall, on a treadmill. If it seems daunting, add 30 seconds or 10 yards each day.',
  },
  {
    title: '4. Arm Curls',
    data: 'Choose hand weights, stretchy bands, or water bottles to try arm curls. Hold the weights at your sides, palms forward. Breathe in. Now lift toward your chest, keeping elbows down, and exhaling slowly. Slowly lower your arms back down as you breathe in. Build up to two sets of 10-15 repetitions.',
  },
  {
    title: '5. Forward Arm Raises',
    data: 'Hold weights down at your sides, palms facing in. Inhale, then exhale slowly as you raise both arms straight out front to shoulder height. Inhale as you slowly lower your arms. This strengthens your upper arms and shoulders. Build up to two sets of 10-15 repetitions. Start with light weights and go a little heavier every two to three weeks to challenge your muscles.',
  },
  {
    title: '6. Exercise Your Diaphragm',
    data: 'This move strengthens a key breathing muscle, the diaphragm. Lie down with your knees bent or sit in an easy chair -- one hand on your chest, one below your rib cage. Slowly inhale through your nose so that your stomach raises one hand. Exhale with pursed lips and tighten your stomach. The hand on your chest should not move. Do this for 5 to 10 minutes, three or four times a day. Breathing this way will become easy and automatic.',
  },
  {
    title: '7. Exercising on Oxygen',
    data: 'If you use oxygen, you may worry that the equipment will be a hazard or a hassle. But if your doctor says to use oxygen during exercise, do it.\nExtra long tubing can help at home. Small, light-weight "travel" tanks keep you mobile. You can do most exercises with oxygen.',
  },
];
function Exercises({navigation, route}) {
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="Exercises" />
      ) : (
        <DashboardHeader
          label="Exercises"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView>
        {data.map(item => (
          <ExerciseCard title={item.title} data={item.data} />
        ))}
      </ScrollView>
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
export default Exercises;
