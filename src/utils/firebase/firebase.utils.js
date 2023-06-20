import { initializeApp } from "firebase/app";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBe_sc_r5TddTvY95MhLbcgCbRICHj77wo",
    authDomain: "crwn-clothing-db-d17df.firebaseapp.com",
    projectId: "crwn-clothing-db-d17df",
    storageBucket: "crwn-clothing-db-d17df.appspot.com",
    messagingSenderId: "486299230572",
    appId: "1:486299230572:web:064268ca05794c90361349"
  };
  
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
};