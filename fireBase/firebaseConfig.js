import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAqiA_zWIhiPjiS-NZSm9zBLtjq-Feei8',
  authDomain: 'react-native-learn1-3adc9.firebaseapp.com',
  projectId: 'react-native-learn1-3adc9',
  storageBucket: 'react-native-learn1-3adc9.appspot.com',
  messagingSenderId: '771185022551',
  appId: '1:771185022551:web:3b7e84109f1da137a0f512',
  measurementId: 'G-VPPR95F4QZ',
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
