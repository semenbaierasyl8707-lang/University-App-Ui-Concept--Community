import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1DGZMLzEHYW5cRoLKPYTTNBgxMZIHYLE",
  authDomain: "universityapp-95895.firebaseapp.com",
  projectId: "universityapp-95895",
  storageBucket: "universityapp-95895.firebasestorage.app",
  messagingSenderId: "643040511363",
  appId: "1:643040511363:web:3e7a41d21279cab83ee2b6"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);