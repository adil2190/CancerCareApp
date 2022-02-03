import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {chatIcon, minimize, chatbotSend} from '../assets/assets';
import {useRef} from 'react';

const ChatbotModal = ({visible, onClose, data, onSubmit}) => {
  const scrollRef = useRef(null);

  const onTextSend = () => {
    console.log(scrollRef.current.scrollTo(0));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}>
      <Pressable onPress={onClose} style={styles.centeredView}>
        <KeyboardAvoidingView></KeyboardAvoidingView>
        <Pressable
          onPress={() => console.log('inner pressed')}
          style={styles.modalView}>
          <View style={styles.chatHeaderWrapper}>
            <View style={styles.chatHeaderLeft}>
              <Image
                source={chatIcon}
                style={styles.img}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.chatTitle}>Cancer Care</Text>
                <Text style={styles.chatSubtitle}>AI Chatbot</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={minimize}
                style={styles.minimizeImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollRef}
            onContentSizeChange={() =>
              scrollRef.current.scrollToEnd({animated: true})
            }
            contentContainerStyle={{
              flexGrow: 1,
              padding: 5,
              flexDirection: 'column-reverse',
            }}>
            <Text style={styles.selfMessage}>Hello me chatbot</Text>
            <Text style={styles.chatbotMessage}>Hello me chatbot</Text>
          </ScrollView>
          <View style={styles.chatInput}>
            <TextInput
              placeholder="Ask a Question"
              returnKeyType="send"
              placeholderTextColor={colors.LIGHTGRAY}
              style={styles.chatField}
              onSubmitEditing={val => console.log('submission')}
            />
            <TouchableOpacity onPress={onTextSend}>
              <Image
                source={chatbotSend}
                style={styles.minimizeImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
    width: '85%',
  },
  chatHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    padding: 10,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: colors.DARK,
    fontFamily: fonts.poppinsRegular,
    fontSize: 16,
  },

  selfMessage: {
    color: '#fff',
    backgroundColor: '#003157',
    minWidth: 50,
    alignSelf: 'flex-end',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
    fontFamily: fonts.poppinsLight,
  },

  chatbotMessage: {
    color: '#fff',
    backgroundColor: '#008EFC',
    minWidth: 50,
    alignSelf: 'flex-start',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
    fontFamily: fonts.poppinsLight,
  },
  img: {
    height: 45,
    width: 45,
    marginRight: 5,
  },

  minimizeImg: {
    height: 30,
    width: 30,
  },

  chatTitle: {
    color: colors.MAIN,
    fontFamily: fonts.poppinsMedium,
    fontSize: 15,
  },
  chatSubtitle: {
    color: colors.LIGHTGRAY,
    fontFamily: fonts.poppinsLight,
    fontSize: 12,
    marginTop: -5,
  },
  chatInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    borderTopColor: '#e5e5e5',
    borderTopWidth: 1,
  },
  chatField: {
    width: '85%',
    fontFamily: fonts.poppinsRegular,
    color: '#333',
  },
});

export default ChatbotModal;
