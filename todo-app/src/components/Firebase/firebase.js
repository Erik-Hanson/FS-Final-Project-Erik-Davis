import firebase from "firebase/app";
import "firebase/auth";
//import "firebase/database";
require("firebase/firestore");

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

// const fire = firebase.initializeApp(config);
// firebase.firestore();
// firebase.auth();

// export const executeCreateUserWithEmailAndPassword = (email, password) =>
//   fire.auth.createUserWithEmailAndPassword(email, password);

// export const executeSignInWithEmailAndPassword = (email, password) =>
//   fire.auth.signInWithEmailAndPassword(email, password);

// export const executeSignOut = () => fire.auth.signOut();

// export const executerPWUpdate = (password) =>
//   fire.auth.currentUser.updatePassword(password);

// export const executePWUpdate = (password) => fire.auth.updatePassword(password);

// export default firebase;

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    //this.db = app.database();
    this.auth = firebase.auth();
    this.db = firebase.firestore();
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

  // getAllNotes = (uid) => this.db.collection(uid).doc("Notes").get();

  // createNote = (uid) => this.db.collection(uid).doc("notes");

  // getCategoryNotes = (uid, category) =>
  //   this.db
  //     .collection(uid)
  //     .doc("Notes")
  //     .collection("all")
  //     .get()
  //     .where("category" === category);

  // add user
  addUserToFirestore = (uid) => {
    const newNote = {
      Text: "This is your first Note",
      Date: Date.now(),
      Category: "",
      Title: "First Note",
    };
    //create first note
    this.db.collection(uid).doc("Notes").collection("all").add(newNote);
  };

  fetchAllNotes = (uid, dispatch) => {
    const newNotes = [];

    this.db
      .collection(uid)
      .doc("Notes")
      .collection("all")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //console.log(doc);
          const note = doc.data();
          const noteWithId = {
            id: doc.id,
            ...note,
          };
          newNotes.push(noteWithId);
        });

        dispatch(newNotes);
      });

    return newNotes;
  };

  //add a note
  addNote = (title, text, category, date) => {
    //dispatch(note);
    const note = {
      Text: text,
      Title: title,
      Category: category,
      //Date: date,
    };
    console.log("this is new note in firebase", note);
    //console.log(this.auth.currentUser.uid);
    // console.log(typeof title, title);
    // console.log(typeof text, text);
    // console.log(typeof category, category);
    //console.log(typeof date, date);
    const uid = this.auth.currentUser.uid;
    try {
      this.db
        .collection(uid)
        .doc("Notes")
        .collection("all")
        .get()
        .then(() => {
          this.db
            .collection(uid)
            .doc("Notes")
            .collection("all")
            .add(note)
            .then(() => console.log("doc written"))
            .catch((error) => console.log("error ", error));
        });
    } catch (e) {
      console.log("this is e ", e);
    }

    //this.db.collection(uid).doc("Notes").collection("all").add(note);
    //console.log("done");
  };
}

export default Firebase;
