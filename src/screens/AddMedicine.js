import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
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
import Dropdown from '../components/Dropdown';
import {useState} from 'react';
import MainModal from '../components/MainModal';

function AddMedicine({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [frequencyVisible, setFrequencyVisible] = useState(false);
  const unitsData = [
    {name: 'mL', id: 1},
    {name: 'tablets', id: 2},
    {name: 'capsules', id: 3},
    {name: 'teaspoons', id: 4},
    {name: 'tablespoons', id: 5},
    {name: 'drops', id: 6},
  ];

  const frequencyData = [
    {name: 'As Needed', id: 1},
    {name: 'Every Hour', id: 2},
    {name: 'Every 2 Hours', id: 3},
    {name: 'Once a Day', id: 4},
    {name: 'Twice a Day', id: 5},
    {name: 'Three Times a Day', id: 6},
    {name: 'Four Times a day', id: 7},
    {name: 'Once a Week', id: 8},
    {name: 'Once a Month', id: 9},
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <ActionHeader onPress={() => navigation.goBack()} label={'Assign'} />
        <Text style={styles.txt}>Add Medicine</Text>
        <InputFieldMin
          placeholder="Medicine Name"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <InputFieldMin
          placeholder="Purpose"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.halfWidth}>
            <InputFieldMin
              placeholder="Dose"
              placeholderTextColor={colors.LIGHTGRAY}
              fullWidth={true}
            />
          </View>
          <View style={styles.halfWidth}>
            <Dropdown
              onPress={() => setModalVisible(true)}
              label={'Units'}
              fullWidth={true}
            />
          </View>
        </View>
        <Dropdown
          onPress={() => setFrequencyVisible(true)}
          label={'Frequency'}
          fullWidth={true}
        />

        <InputFieldMin
          placeholder="Days"
          placeholderTextColor={colors.LIGHTGRAY}
          fullWidth={true}
        />
        <Text style={styles.smallTxt}> NOTES </Text>
        <InputFieldMin fullWidth={true} multiline={true} numberOfLines={8} />
      </View>

      <MainModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => setModalVisible(false)}
        data={unitsData}
      />
      <MainModal
        visible={frequencyVisible}
        onClose={() => setFrequencyVisible(false)}
        onSubmit={() => setFrequencyVisible(false)}
        data={frequencyData}
      />
    </ScrollView>
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

export default AddMedicine;
