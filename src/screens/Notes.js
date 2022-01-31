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
import {getSubCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

function Notes({navigation, route}) {
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
      const response = await getSubCollection(
        collectionNames.patients,
        userId,
        collectionNames.notes,
      );
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
        <BackHeader onPress={() => navigation.goBack()} label="Notes" />
      ) : (
        <DashboardHeader
          label="My Notes"
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
            <NotesCard
              onPress={() => navigation.push('NoteDetails', {data: item})}
              note={item.title}
              date={new Date(item.date).toDateString()}
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

export default Notes;
