import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import ActionHeader from '../components/ActionHeader';
import {fonts} from '../constants/fonts';
function NoteDetails({navigation}) {
  return (
    <View style={styles.container}>
      <ActionHeader label={'Save'} />
      <Text style={styles.input}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sunt ut
        deserunt odit nesciunt cum, labore saepe architecto possimus impedit
        vero? Et dolorem quos eius magni commodi excepturi, natus possimus?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla deserunt
        excepturi rem totam! Natus quasi sunt voluptatem magni, iure pariatur
        officia accusantium voluptate, sint, repellendus culpa neque odit facere
        veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        distinctio aut corporis similique excepturi! Provident assumenda
        deleniti deserunt maxime necessitatibus incidunt praesentium culpa optio
        laborum magnam, reprehenderit maiores iusto soluta. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Cumque dolorem aspernatur eius
        veritatis amet molestiae provident, corporis dolore quis unde atque odio
        accusantium et animi. Voluptate itaque quidem eaque iure?
      </Text>
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
