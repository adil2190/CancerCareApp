import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {colors} from '../constants/colors';
import DashboardHeader from '../components/DashboardHeader';
import DashboardCard from '../components/DashboardCard';
import ChatbotModal from '../components/ChatbotModal';
import {
  myAppointments,
  myDiet,
  myExercise,
  myMedicine,
  myNotes,
  chatbot,
  notification,
} from '../assets/assets';

function Dashboard({navigation}) {
  console.warn = () => {};
  const [modalVisible, setModalVisible] = useState();
  const [alertCount, setAlertCount] = React.useState(0);
  const {patientData} = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log('from context ----------> ', patientData);
    const subscribe = firestore()
      .collection('DoctorAlerts')
      .where('patientId', '==', patientData.userId)
      .onSnapshot(querySnapshot => {
        let localData = [];
        querySnapshot.forEach(doc => {
          localData.push({...doc.data(), selfId: doc.id});
        });
        setAlertCount(localData.filter(item => item.isRead == false).length);
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.chatbotStyle}>
        <Image source={chatbot} style={styles.chatbotImg} />
      </TouchableOpacity>

      <DashboardHeader
        label="Dashboard"
        onPressed={() => navigation.openDrawer()}
        onActionPressed={() => navigation.push('DoctorAlerts', {isBack: true})}
        icon={notification}
        count={alertCount}
      />
      <ScrollView>
        <DashboardCard
          onPress={() => navigation.push('MyAppointments', {isBack: true})}
          img={myAppointments}
          label="Appointments"
        />
        <DashboardCard
          img={myDiet}
          label="Diet"
          onPress={() => navigation.push('Diet', {isBack: true})}
        />
        <DashboardCard
          onPress={() => navigation.push('Exercises', {isBack: true})}
          img={myExercise}
          label="Exercise"
        />
        <DashboardCard
          onPress={() => navigation.push('MyMedicines', {isBack: true})}
          img={myMedicine}
          label="Medications"
        />
        <DashboardCard
          onPress={() => navigation.push('Notes', {isBack: true})}
          img={myNotes}
          label="Notes"
        />
        {modalVisible && (
          <ChatbotModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  chatbotStyle: {position: 'absolute', zIndex: 10, bottom: 10, right: 10},
  chatbotImg: {
    resizeMode: 'contain',
    height: 60,
    width: 60,
  },
});

export default Dashboard;
