import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQPq6FTRyiFUBotlBDWMLZ4JshBMq7UDU",
  authDomain: "simple-notes-firebase-848a7.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase-848a7.firebaseio.com",
  projectId: "simple-notes-firebase-848a7",
  storageBucket: "simple-notes-firebase-848a7.appspot.com",
  messagingSenderId: "687823214905",
  appId: "1:687823214905:web:53a8c1cd82bc1e1cb3f0e8",
  measurementId: "G-RXT4ZNLYSW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
