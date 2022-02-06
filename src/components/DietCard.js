import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';

function DietCard({title, data, onSelect, selected}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}> {title} </Text>
      {data && (
        <>
          {data.map(item => (
            <TouchableOpacity onPress={() => onSelect(item.id)}>
              <Text
                key={item.id}
                style={
                  selected == item.id
                    ? [styles.itemTxt, {color: colors.MAIN}]
                    : styles.itemTxt
                }>
                {' '}
                {item.name}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '85%',
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 5,
    minHeight: 260,
    marginBottom: 20,
    marginTop: 10,
  },
  heading: {
    color: colors.MAIN,
    padding: 10,
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 18,
  },
  itemTxt: {
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: fonts.poppinsRegular,
  },
});
export default DietCard;
