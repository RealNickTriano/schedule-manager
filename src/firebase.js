import { initializeApp } from "firebase/app";
​​import {
​​  GoogleAuthProvider,
​​  getAuth,
​​  signInWithPopup,
​​  signInWithEmailAndPassword,
​​  createUserWithEmailAndPassword,
​​  sendPasswordResetEmail,
​​  signOut,
​​} from "firebase/auth";
​​import {
​​  getFirestore,
​​  query,
​​  getDocs,
​​  collection,
​​  where,
​​  addDoc,
​​} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0_kO-4pJ8A5aEiqpzm_SFDvkeHGNpzV4",
    authDomain: "schedule-manager-a17f2.firebaseapp.com",
    projectId: "schedule-manager-a17f2",
    storageBucket: "schedule-manager-a17f2.appspot.com",
    messagingSenderId: "787199070113",
    appId: "1:787199070113:web:19fa53fb81d734282885e0",
    measurementId: "G-LRVW8788VB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)