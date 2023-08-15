import { initializeApp } from "firebase/app";

import { getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBe_sc_r5TddTvY95MhLbcgCbRICHj77wo",
    authDomain: "crwn-clothing-db-d17df.firebaseapp.com",
    projectId: "crwn-clothing-db-d17df",
    storageBucket: "crwn-clothing-db-d17df.appspot.com",
    messagingSenderId: "486299230572",
    appId: "1:486299230572:web:064268ca05794c90361349"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  
  if (!userAuth) return;
  
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInformation
      });
    } catch (error) {
      console.log("Error while creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
 
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);

};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
 
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);

};