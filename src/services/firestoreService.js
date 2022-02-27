import auth, {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {collectionNames} from '../constants/collections';

export const signInUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      return resolve({result: 'success', message: user});
    } catch (err) {
      //   console.log(err);
      return reject({result: 'failed', message: err});
    }
  });
};

export const addSingleDoc = (collectionName, body) => {
  return new Promise(async (resolve, reject) => {
    console.log(body);
    try {
      await firestore().collection(collectionName).add(body);
      return resolve({
        result: 'success',
        message: 'document added successfully',
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const getSingleDoc = (collectionName, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await firestore()
        .collection(collectionName)
        .doc(docId)
        .get();
      return resolve({result: 'success', message: docRef.data()});
    } catch (err) {
      //   console.log(err);
      return reject({result: 'failed', message: err});
    }
  });
};
export const deleteSingleDoc = (collectionName, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await firestore()
        .collection(collectionName)
        .doc(docId)
        .delete();
      return resolve({
        result: 'success',
        message: 'document deleted Successfully.',
      });
    } catch (err) {
      //   console.log(err);
      return reject({result: 'failed', message: err});
    }
  });
};

export const getCollection = collectionName => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await firestore().collection(collectionName).get();
      return resolve({
        result: 'success',
        message: response.docs.map(item => {
          return {...item.data(), selfId: item.id};
        }),
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const getAppointments = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await firestore()
        .collection(collectionNames.appointments)
        .where('doctorId', '==', id)
        .get();
      return resolve({
        result: 'success',
        message: response.docs.map(item => item.data()),
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const getPatientAppointments = id => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await firestore()
        .collection(collectionNames.appointments)
        .where('patientId', '==', id)
        .get();
      return resolve({
        result: 'success',
        message: response.docs.map(item => item.data()),
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const addInSubcollection = async (
  collectionName,
  docId,
  childCollectionName,
  body,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await firestore()
        .collection(collectionName)
        .doc(docId)
        .collection(childCollectionName)
        .add(body);
      return resolve({
        result: 'success',
        message: 'document added successfully',
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const getSubCollection = async (
  collectionName,
  docId,
  childCollectionName,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await firestore()
        .collection(collectionName)
        .doc(docId)
        .collection(childCollectionName)
        .get();
      return resolve({
        result: 'success',
        message: response.docs.map(item => item.data()),
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

export const updateDocument = (collectionName, docName, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      await firestore().collection(collectionName).doc(docName).update(body);
      return resolve({
        result: 'success',
        message: 'document updated successfully',
      });
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};
