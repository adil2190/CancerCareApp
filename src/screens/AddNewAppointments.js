import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ActionHeader from '../components/ActionHeader';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import InputFieldMin from '../components/InputFieldMin';

function AddNewAppointments({navigation}) {
  return (
    <View style={styles.container}>
      <ActionHeader label={'Done'} />
      <Text style={styles.txt}>New Appointments</Text>
      <InputFieldMin
        placeholder="Patient Id"
        placeholderTextColor={colors.LIGHTGRAY}
        fullWidth={true}
      />
      <InputFieldMin
        placeholder="Title"
        placeholderTextColor={colors.LIGHTGRAY}
        fullWidth={true}
      />
      <InputFieldMin
        placeholder="Date"
        placeholderTextColor={colors.LIGHTGRAY}
        fullWidth={true}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={styles.halfWidth}>
          <InputFieldMin
            placeholder="Start Time"
            placeholderTextColor={colors.LIGHTGRAY}
            fullWidth={true}
          />
        </View>
        <View style={styles.halfWidth}>
          <InputFieldMin
            placeholder="End Time"
            placeholderTextColor={colors.LIGHTGRAY}
            fullWidth={true}
          />
        </View>
      </View>
      <InputFieldMin
        placeholder="Alert"
        placeholderTextColor={colors.LIGHTGRAY}
        fullWidth={true}
      />
      <Text style={styles.smallTxt}> NOTES </Text>
      <InputFieldMin fullWidth={true} multiline={true} numberOfLines={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  txt: {
    fontFamily: fonts.poppinsBold,
    color: colors.MAIN,
    fontSize: hp('2.8%'),
    marginLeft: 20,
    marginBottom: 10,
  },
  halfWidth: {
    width: '50%',
  },
  smallTxt: {
    fontFamily: fonts.poppinsRegular,
    color: '#666',
    marginLeft: 20,
    marginVertical: 10,
    fontSize: hp('2.2%'),
  },
});

export default AddNewAppointments;
