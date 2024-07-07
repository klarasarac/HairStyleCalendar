import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgDAiLr9tyUnkG0fAwuCw2vtg7fzIByJM",
  authDomain: "hairstylecalendar-76902.firebaseapp.com",
  databaseURL:
    "https://hairstylecalendar-76902-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hairstylecalendar-76902",
  storageBucket: "hairstylecalendar-76902.appspot.com",
  messagingSenderId: "990933800087",
  appId: "1:990933800087:web:b9adbc7614d96e378745d2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export {  signInWithPopup };
