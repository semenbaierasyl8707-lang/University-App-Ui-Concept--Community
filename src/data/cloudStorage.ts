import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { signInAnonymously } from 'firebase/auth';
import { auth, db } from './firebase';

const ensureAuth = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }

  return auth.currentUser!.uid;
};

export const saveCloudData = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  try {
    const uid = await ensureAuth();

    const docRef = await addDoc(collection(db, 'users'), {
      ...data,
      uid,
    });

    console.log('Data saved:', docRef.id);
    return true;
  } catch (error) {
    console.log('Firebase save error:', error);
    return false;
  }
};

export const getCloudData = async () => {
  try {
    const uid = await ensureAuth();

    const q = query(
      collection(db, 'users'),
      where('uid', '==', uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log('Firebase read error:', error);
    return [];
  }
};