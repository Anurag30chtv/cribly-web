// src/firebase.js or src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUrQbyahPDI9Bl79QQwTwMo125WZUNZ4s",
  authDomain: "cribly-v2.firebaseapp.com",
  projectId: "cribly-v2",
  storageBucket: "cribly-v2.appspot.com",
  messagingSenderId: "482987767253",
  appId: "1:482987767253:web:f476107c29c8e9e689b95c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
