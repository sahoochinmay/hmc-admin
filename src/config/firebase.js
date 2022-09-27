import firebase from "firebase/app";
import 'firebase/auth';  // If using Firebase storage
import 'firebase/firestore'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

const firebaseConfig = {
  apiKey: "AIzaSyBr05pAUDy9ORxdzLVSPX312JQTjG1n9a8",
  authDomain: "hmctest1-48bf0.firebaseapp.com",
  projectId: "hmctest1-48bf0",
  storageBucket: "hmctest1-48bf0.appspot.com",
  messagingSenderId: "694913509519",
  appId: "1:694913509519:web:53938398bb0e6b10f468fa",
  measurementId: "G-2WFP4GF676",
};
// initialize app
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const ticketRef = db.collection("Ticket");

export const foodsRef = db.collection("Food");
