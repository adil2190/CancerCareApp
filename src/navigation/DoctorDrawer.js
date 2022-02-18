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
import auth from '@react-native-firebase/auth';

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
import AssignedMedicines from '../screens/AssignedMedicines';
import Notes from '../screens/Notes';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';
import DoctorDashboard from '../screens/DoctorDashboard';
import DoctorAppointment from '../screens/DoctorAppointments';
import CancerDetection from '../screens/CancerDetection';
import MyPatients from '../screens/MyPatients';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {getSingleDoc} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {useState} from 'react';
import {Alert} from 'react-native';

function DoctorDrawer(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="DoctorDashboard"
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Drawer.Screen name="DoctorAppointment" component={DoctorAppointment} />
      <Drawer.Screen name="CancerDetection" component={CancerDetection} />
      <Drawer.Screen name="AssignedMedicines" component={AssignedMedicines} />
      <Drawer.Screen name="MyPatients" component={MyPatients} />
    </Drawer.Navigator>
  );
}

const DrawerContent = ({navigation}, props) => {
  const [selfData, setSelfData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const patient = await getSingleDoc(collectionNames.doctors, userId);
      setSelfData(patient.message);
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    }
  };

  const onLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userId');
      navigation.replace('LoginAs');
    } catch (err) {
      console.log(err);
      Alert.alert('Error!', err.message);
    }
  };
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
                <Text style={styles.introTitle}>{selfData.fullName}</Text>
                <Text style={styles.introSubtitle}>{selfData.type}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AssignedMedicines')}
            style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerMedicine}
              />
              <Text style={styles.txt}>Medicines</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorAppointment')}
            style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerAppointment}
              />
              <Text style={styles.txt}>Appointments</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemParentContainer}
            onPress={() => navigation.navigate('CancerDetection')}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerNotes}
              />
              <Text style={styles.txt}>AI Cancer Detection</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyPatients')}
            style={styles.itemParentContainer}>
            <View style={styles.itemContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={drawerDiet}
              />
              <Text style={styles.txt}>My Patients</Text>
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
            onPress={onLogout}>
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

export default DoctorDrawer;
