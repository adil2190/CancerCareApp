import React, {useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

import BackHeader from '../components/BackHeader';
import AppointmentCard from '../components/AppointmentCard';
import {colors} from '../constants/colors';
import {search1} from '../assets/assets';
import MyButton from '../components/MyButton';
import {fonts} from '../constants/fonts';
import DashboardHeader from '../components/DashboardHeader';
import PatientCards from '../components/PatientCards';
import {useFocusEffect} from '@react-navigation/native';
import {getCollection} from '../services/firestoreService';
import {collectionNames} from '../constants/collections';
import {useState} from 'react';

function AssignedMedicines({navigation, route}) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fixedData, setFixedData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      setLoader(true);
      const response = await getCollection(collectionNames.patients);
      setData(response.message);
      setFixedData(response.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = val => {
    const filtered = fixedData.filter(item => item.code.includes(val));
    setData(filtered);
  };
  return (
    <View style={styles.container}>
      {route.params?.isBack ? (
        <BackHeader
          onPress={() => navigation.goBack()}
          label="Assigned Medicines"
        />
      ) : (
        <DashboardHeader
          label="Assigned Medicines"
          onPressed={() => navigation.openDrawer()}
        />
      )}

      <View style={styles.searchWrapper}>
        <View style={styles.search}>
          <Image source={search1} resizeMode="contain" style={styles.img} />
          <TextInput
            onChangeText={val => handleSearch(val)}
            keyboardType="number-pad"
            style={styles.searchInput}
            placeholder="Search with Patient Code"
            placeholderTextColor={colors.LIGHTGRAY}
          />
        </View>
      </View>
      {loader ? (
        <ActivityIndicator color={colors.MAIN} size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}>
          {data.map(item => (
            <PatientCards data={item} />
          ))}

          <MyButton
            onPress={() => navigation.push('AddMedicine')}
            label="Add new Medicine"
            buttonStyle={{marginTop: 20}}
          />
        </ScrollView>
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
  searchWrapper: {
    alignItems: 'center',
    elevation: 2,
    width: '80%',
    alignSelf: 'center',
  },
  search: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  searchInput: {
    color: '#333',
    width: '90%',
    paddingTop: 15,
    fontFamily: fonts.poppinsRegular,
  },
  img: {
    height: 20,
    width: 20,
  },
});

export default AssignedMedicines;
