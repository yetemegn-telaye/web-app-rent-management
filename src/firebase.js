// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_H31tF9xdSwnNjsfWNIDI8Ntz8rmaM1I",
  authDomain: "rent-management-39580.firebaseapp.com",
  projectId: "rent-management-39580",
  storageBucket: "rent-management-39580.firebasestorage.app",
  messagingSenderId: "387284782159",
  appId: "1:387284782159:web:367e53ef9746fc040c6e3a",
  measurementId: "G-XD1ZFKH8M2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);