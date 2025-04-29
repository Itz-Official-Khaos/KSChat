// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9ScrmWyTEI08hyejIrTzij4w2jk1_keg",
  authDomain: "kryptonite-services.firebaseapp.com",
  projectId: "kryptonite-services",
  storageBucket: "kryptonite-services.firebasestorage.app",
  messagingSenderId: "915071488615",
  appId: "1:915071488615:web:6952ad996bbe31cf34bac2",
  measurementId: "G-8B98FVRHQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}