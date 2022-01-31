import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
import InputFieldMin from '../components/InputFieldMin';
import {addInSubcollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

function AddNote({navigation}) {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    title: '',
    body: '',
    date: Date.now(),
  });

  const isValid = data.title && data.body;

  const saveNote = async () => {
    if (isValid) {
      try {
        setLoader(true);
        const userId = await AsyncStorage.getItem('userId');
        await addInSubcollection(
          collectionNames.patients,
          userId,
          collectionNames.notes,
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
    <View style={styles.container}>
      <ActionHeader
        onPress={() => navigation.goBack()}
        label={'Save'}
        onActionPressed={saveNote}
        isDisabled={loader}
      />

      <InputFieldMin
        placeholder="Note Title"
        placeholderTextColor={colors.LIGHTGRAY}
        fullWidth={true}
        value={data.title}
        onChangeText={val => setData({...data, title: val})}
      />
      <View style={{marginVertical: 3}}></View>
      <TextInput
        placeholder="Write Something..."
        placeholderTextColor={colors.LIGHTGRAY}
        style={styles.input}
        multiline={true}
        numberOfLines={25}
        textAlignVertical="top"
        value={data.body}
        onChangeText={val => setData({...data, body: val})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    color: colors.DARK,
    fontFamily: fonts.poppinsMedium,
  },
});

export default AddNote;
