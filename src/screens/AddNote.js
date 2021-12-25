import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
function AddNote({navigation}) {
  return (
    <View style={styles.container}>
      <ActionHeader label={'Save'} />
      <TextInput
        placeholder="Write Something..."
        placeholderTextColor={colors.LIGHTGRAY}
        style={styles.input}
        multiline={true}
        numberOfLines={25}
        textAlignVertical="top"
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
