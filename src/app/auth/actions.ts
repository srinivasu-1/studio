
'use server';

import {
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// A helper function to create a user profile in Firestore
async function createUserProfile(user: { uid: string; email: string | null; displayName?: string | null; photoURL?: string | null; }) {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0],
      photoURL: user.photoURL || `https://api.dicebear.com/8.x/lorelei/svg?seed=${user.uid}`,
      createdAt: new Date().toISOString(),
    });
  }
}

// Sign up with email and password
export async function signUpWithEmailAndPassword({ name, email, password }: Record<string, string>) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await createUserProfile({ ...user, displayName: name });
    return { uid: user.uid, email: user.email };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Sign in with email and password
export async function signInWithEmailAndPassword({ email, password }: Record<string, string>) {
  try {
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    return { uid: userCredential.user.uid, email: userCredential.user.email };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// This function needs to be called from the client to trigger the popup
export async function handleGoogleSignIn() {
    if (typeof window === 'undefined') {
        throw new Error('Google sign in must be called from the client');
    }
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await createUserProfile(result.user);
    } catch (error: any) {
        console.error("Google Sign-In Error:", error);
        throw new Error(error.message || 'Failed to sign in with Google.');
    }
}


// Sign out
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
