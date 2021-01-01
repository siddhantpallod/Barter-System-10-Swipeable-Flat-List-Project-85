import firebase from 'firebase';
require('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA0qSuAS0WE-jKLba4Faj0RvGhprSBGjqA",
    authDomain: "barter-system-app-64f28.firebaseapp.com",
    databaseURL: "https://barter-system-app-64f28.firebaseio.com",
    projectId: "barter-system-app-64f28",
    storageBucket: "barter-system-app-64f28.appspot.com",
    messagingSenderId: "234375218508",
    appId: "1:234375218508:web:a7623f92602278f1e67be9"
  };
  // Initialize Firebase
  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db;