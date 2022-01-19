import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';

const MainModal = ({visible, onClose, data, onSubmit}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}>
      <Pressable onPress={onClose} style={styles.centeredView}>
        <Pressable
          onPress={() => console.log('inner pressed')}
          style={styles.modalView}>
          {data.map(item => (
            <TouchableOpacity onPress={onSubmit} key={item.id}>
              <Text style={styles.modalText}> {item.name} </Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 100,
    width: '80%',
  },

  modalText: {
    marginBottom: 15,
    color: colors.DARK,
    fontFamily: fonts.poppinsRegular,
    fontSize: 16,
  },
});

export default MainModal;
