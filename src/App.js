import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { userAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'; 

firebase.initializeApp({
  apiKey: "AIzaSyA9ScrmWyTEI08hyejIrTzij4w2jk1_keg",
  authDomain: "kryptonite-services.firebaseapp.com",
  projectId: "kryptonite-services",
  storageBucket: "kryptonite-services.firebasestorage.app",
  messagingSenderId: "915071488615",
  appId: "1:915071488615:web:6952ad996bbe31cf34bac2",
  measurementId: "G-8B98FVRHQ3"
})

const auth = firebase.auth();
const firebase = firebase.firestore();



function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
