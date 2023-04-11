import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCA1kMtQN3V0rCwWCKk59uULJnlgDwpqNA",
  authDomain: "the-amazing-ml-race.firebaseapp.com",
  databaseURL: "https://the-amazing-ml-race-default-rtdb.firebaseio.com",
  projectId: "the-amazing-ml-race",
  storageBucket: "the-amazing-ml-race.appspot.com",
  messagingSenderId: "610609162284",
  appId: "1:610609162284:web:f853f944fee177b33f0989"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);