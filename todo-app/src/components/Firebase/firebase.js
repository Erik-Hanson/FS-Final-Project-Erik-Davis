import app from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebase = require("firebase");

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

  }

  // *** Auth API ***
  executeCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  executeSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  executeSignOut = () => this.auth.signOut();

  executePWReset = (email) => this.auth.sendPasswordResetEmail(email);

  executePWUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

    // *** Firestore API *** 

}

var db = firebase.firestore();
export default Firebase;
