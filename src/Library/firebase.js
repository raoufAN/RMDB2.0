// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rmdb-f1c96.firebaseapp.com",
  projectId: "rmdb-f1c96",
  storageBucket: "rmdb-f1c96.firebasestorage.app",
  messagingSenderId: "298199061327",
  appId: "1:298199061327:web:544b2a3b5009fc0c736b3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
//raoufchatapp
