import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import BackHeader from '../components/BackHeader';
import MedicineCard from '../components/MedicineCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';

function MyMedicines({navigation, route}) {
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="My Medicines" />
      ) : (
        <DashboardHeader
          label="My Medicines"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <MedicineCard
          name="Panadol"
          totalDuration="4 days"
          duration="1 tablet, 3 times a day"
        />
        <MedicineCard
          name="Panadol"
          totalDuration="4 days"
          duration="1 tablet, 3 times a day"
        />
        <MedicineCard
          name="Panadol"
          totalDuration="4 days"
          duration="1 tablet, 3 times a day"
        />
        <MedicineCard
          name="Panadol"
          totalDuration="4 days"
          duration="1 tablet, 3 times a day"
        />

        <MyButton
          onPress={() => navigation.push('AddNewAppointments')}
          label="Add new Medicine"
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

export default MyMedicines;
