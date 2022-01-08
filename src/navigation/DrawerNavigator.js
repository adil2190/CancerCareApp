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

import {drawerMedicine, close} from '../assets/assets';
import Dashboard from '../screens/Dashboard';
import MyAppointments from '../screens/MyAppointments';
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
    </Drawer.Navigator>
  );
}

const DrawerContent = props => {
  return (
    <ScrollView style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.upperContainer}>
          <View style={styles.intro}>
            <TouchableOpacity>
              <Image
                style={[styles.img, {position: 'absolute', top: 10, right: 10}]}
                resizeMode="contain"
                source={close}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerMedicine}
              />
              <Text style={styles.txt}>My Medicines</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerMedicine}
              />
              <Text style={styles.txt}>My Medicines</Text>
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
