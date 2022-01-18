import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import BackHeader from '../components/BackHeader';
import MyButton from '../components/MyButton';
import NotesCard from '../components/NotesCard';
import DashboardHeader from '../components/DashboardHeader';

import {colors} from '../constants/colors';

function Notes({navigation, route}) {
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="Notes" />
      ) : (
        <DashboardHeader
          label="My Notes"
          onPressed={() => navigation.openDrawer()}
        />
      )}
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <NotesCard
          onPress={() => navigation.push('NoteDetails')}
          note="Id Password"
          date="10th, July"
        />
        <NotesCard
          onPress={() => navigation.push('NoteDetails')}
          note="Irritation"
          date="10th, July"
        />
        <NotesCard
          onPress={() => navigation.push('NoteDetails')}
          note="Points for next appointment"
          date="10th, July"
        />
        <NotesCard
          onPress={() => navigation.push('NoteDetails')}
          note="Id password"
          date="10th, July"
        />
        <MyButton
          onPress={() => navigation.push('AddNote')}
          label="Add new note"
          buttonStyle={{marginTop: 20}}
        />
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
