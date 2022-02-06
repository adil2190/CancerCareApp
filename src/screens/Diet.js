import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../constants/colors';
import BackHeader from '../components/BackHeader';
import DashboardHeader from '../components/DashboardHeader';
import {fonts} from '../constants/fonts';
import DietCard from '../components/DietCard';
import {useState} from 'react';
function Diet({navigation, route}) {
  const [breakfastSelected, setBreakfastSelected] = useState('');

  const breakfastData = [
    {id: 1, name: 'Omellete'},
    {id: 2, name: 'Fried Egg'},
    {id: 3, name: 'Beans'},
  ];
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="My Diet" />
      ) : (
        <DashboardHeader
          label="My Diet"
          onPressed={() => navigation.openDrawer()}
        />
      )}
      <Text style={styles.dietHeading}>Monday</Text>
      <ScrollView>
        <DietCard
          title={'Breakfast'}
          data={breakfastData}
          onSelect={val => setBreakfastSelected(val)}
          selected={breakfastSelected}
        />
        <DietCard title={'Lunch'} />
        <DietCard title={'Dinner'} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  dietHeading: {
    color: colors.MAIN,
    padding: 15,
    fontSize: 20,
    fontFamily: fonts.poppinsBold,
  },
});
export default Diet;
