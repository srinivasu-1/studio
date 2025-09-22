
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-7489689194-17c56",
  appId: "1:630719410744:web:f5c3910cd575c61f8beccd",
  apiKey: "AIzaSyBrUvKYZ8TZtCJNWxukv5MF2dVZ3-ipX5s",
  authDomain: "studio-7489689194-17c56.firebaseapp.com",
  messagingSenderId: "630719410744"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
