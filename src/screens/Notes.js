import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import BackHeader from '../components/BackHeader';
import MyButton from '../components/MyButton';
import NotesCard from '../components/NotesCard';

import {colors} from '../constants/colors';

function Notes(props) {
  return (
    <View style={styles.container}>
      <BackHeader label="Notes" />
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <NotesCard note="Id Password" date="10th, July" />
        <NotesCard note="Irritation" date="10th, July" />
        <NotesCard note="Points for next appointment" date="10th, July" />
        <NotesCard note="Id password" date="10th, July" />
        <MyButton label="Add new note" buttonStyle={{marginTop: 20}} />
      </ScrollView>
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

export default Notes;
