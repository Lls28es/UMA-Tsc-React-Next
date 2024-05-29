import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCz-aXgGz_kyKQ2WOmiGTPdObQSLaZhhoc',
  authDomain: 'adetech-api.firebaseapp.com',
  projectId: 'adetech-api',
  storageBucket: 'adetech-api.appspot.com',
  messagingSenderId: '632020590226',
  appId: '1:632020590226:web:eb4de997236e925c18104b',
  measurementId: 'G-PGJEK8VMDP',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();