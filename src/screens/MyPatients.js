import React, {useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import {doctor, patient, logo} from '../assets/assets';
import MyPatientCard from '../components/MyPatientCard';
import {useState} from 'react';
import AlertModal from '../components/AlertModal';
import {addSingleDoc, getSubCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {AuthContext} from '../context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';

function MyPatients({navigation, route}) {
  const {doctorData} = React.useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      const response = await getSubCollection(
        collectionNames.doctors,
        doctorData.userId,
        'AssignedPatients',
      );
      // console.log(response.message);
      setPatients(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  const alertData = {
    patientId: currentId,
    doctorId: doctorData.userId,
    isRead: false,
    createdAt: Date.now().toString(),
  };

  const sendAlertRequest = async msg => {
    try {
      setSubmitLoader(true);
      const response = await addSingleDoc('DoctorAlerts', {
        ...alertData,
        message: msg,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitLoader(false);
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader onPress={() => navigation.goBack()} label="My Patients" />
      ) : (
        <DashboardHeader
          label="My Patients"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        {patients.map(item => (
          <MyPatientCard
            key={item.userId}
            onPress={() => {
              setCurrentId(item.userId);
              setModalVisible(true);
            }}
            name={`${item.fullName} (${item.code})`}
          />
        ))}
      </ScrollView>
      {modalVisible && (
        <AlertModal
          loader={submitLoader}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={val => sendAlertRequest(val)}
        />
      )}
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
  round: {
    height: 140,
    width: 140,
    borderRadius: 10000,
    backgroundColor: colors.WHITE,
    marginTop: hp('8%'),
    elevation: 4,
  },
  img: {
    height: hp('18%'),
    width: hp('18%'),
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '90%',
    alignItems: 'center',
  },
});

export default MyPatients;
