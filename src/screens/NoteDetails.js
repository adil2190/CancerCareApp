import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
function NoteDetails({navigation, route}) {
  const data = route.params?.data;
  return (
    <View style={styles.container}>
      <ActionHeader onPress={() => navigation.goBack()} label={'Delete'} />
      <Text style={styles.input}>{data.body}</Text>
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
    fontFamily: fonts.poppinsRegular,
  },
});

export default NoteDetails;
