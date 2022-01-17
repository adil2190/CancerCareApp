import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  drawerMedicine,
  close,
  drawerDiet,
  drawerMedical,
  drawerNotes,
  drawerAppointment,
  logout,
} from '../assets/assets';
import Dashboard from '../screens/Dashboard';
import MyAppointments from '../screens/MyAppointments';
import MyMedicines from '../screens/MyMedicines';
import Notes from '../screens/Notes';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';

function DrawerNavigator(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="MyAppointments" component={MyAppointments} />
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="MyMedicines" component={MyMedicines} />
    </Drawer.Navigator>
  );
}

const DrawerContent = ({navigation}, props) => {
  return (
    <ScrollView style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.upperContainer}>
          <View style={styles.intro}>
            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
              <Image
                style={[styles.img, {position: 'absolute', top: 10, right: 10}]}
                resizeMode="contain"
                source={close}
              />
            </TouchableOpacity>

            <View style={styles.introtxtContainer}>
              <View>
                <Text style={styles.introTitle}>Safeena Ahmed</Text>
                <Text style={styles.introSubtitle}>Luxemberg</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyMedicines')}
            style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerMedicine}
              />
              <Text style={styles.txt}>My Medicines</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyAppointments')}
            style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerAppointment}
              />
              <Text style={styles.txt}>My Appointments</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerMedical}
              />
              <Text style={styles.txt}>Medical Records</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerDiet}
              />
              <Text style={styles.txt}>Diet</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemParentContainer}
            onPress={() => navigation.navigate('Notes')}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerNotes}
              />
              <Text style={styles.txt}>Notes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: hp('25%'),
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={[styles.itemParentContainer]}
            onPress={() => navigation.replace('LoginScreen')}>
            <View style={styles.itemContainer}>
              <Image style={styles.img} resizeMode="contain" source={logout} />
              <Text style={styles.txt}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    color: '#fff',
  },
  upperContainer: {
    height: hp('70%'),
  },
  intro: {
    backgroundColor: '#ECF1FA',
    height: hp('25%'),
  },
  introtxtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  introTitle: {
    color: colors.MAIN,
    fontFamily: fonts.poppinsBold,
    fontSize: 18,
  },
  introSubtitle: {
    color: colors.MAIN,
    fontFamily: fonts.poppinsRegular,
    fontSize: 15,
    marginTop: -7,
  },
  itemParentContainer: {
    marginLeft: 30,
    marginVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  txt: {
    fontFamily: fonts.poppinsRegular,
    color: '#666',
    fontSize: hp('2.3%'),
    marginLeft: 15,
  },
  img: {
    height: 20,
    width: 20,
  },
});

export default DrawerNavigator;
