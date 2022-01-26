import auth, {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
