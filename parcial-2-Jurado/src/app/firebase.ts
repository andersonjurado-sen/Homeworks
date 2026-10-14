import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1SQ4IvmkfhqEHmAZ1IyutUOdFLHOJ_X4",
  authDomain: "parcial2anderson.firebaseapp.com",
  projectId: "parcial2anderson",
  storageBucket: "parcial2anderson.firebasestorage.app",
  messagingSenderId: "727413255482",
  appId: "1:727413255482:web:821a850e63a2150a5eb403",
  measurementId: "G-JECGM54RRE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);