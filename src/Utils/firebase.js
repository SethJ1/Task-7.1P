// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm9ziukZyWUWBqMK3R2LPqiG8UiSG5V9w",
  authDomain: "devlink-marketplace-fd67d.firebaseapp.com",
  projectId: "devlink-marketplace-fd67d",
  storageBucket: "devlink-marketplace-fd67d.appspot.com",
  messagingSenderId: "1061929378730",
  appId: "1:1061929378730:web:98c4d490fbc2b7bb2dc1d3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  provider.setCustomParameters ({
    prompt:"select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) =>{
  if (! userAuth.email) return;
  const userDocRef = doc (db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (! userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();
  
  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  catch (error){
  console.log('error in creating ', error.message)
  }
}

  return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}