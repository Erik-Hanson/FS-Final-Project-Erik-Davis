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

  moveNoteToTrash = (uid, note) => {
    const newNote = {
      Text: note.Text,
      Date: note.Date,
      Category: note.Category,
      Title: note.Title,
    };

    this.db.collection(uid).doc("Notes").collection("trash").add(newNote);
  };

  restoreNote = async (note, noteId, dispatch) => {
    const uid = this.auth.currentUser.uid;
    const newNote = {
      Text: note.Text,
      Date: note.Date,
      Category: note.Category,
      Title: note.Title,
    };

    //restore notes
    //delete from trash
    await this.db
      .collection(uid)
      .doc("Notes")
      .collection("all")
      .add(newNote)
      .then(
        this.db
          .collection(uid)
          .doc("Notes")
          .collection("trash")
          .doc(noteId)
          .delete()
      )
      .then(dispatch(true));

    //set update to true
  };

  deleteNoteFromNotes = (uid, noteId) => {
    this.db.collection(uid).doc("Notes").collection("all").doc(noteId).delete();
  };

  deleteNote = async (uid, noteId, note) => {
    this.moveNoteToTrash(uid, note);
    await this.deleteNoteFromNotes(uid, noteId);
  };

  deletePermanent = async (uid, noteId, dispatch) => {
    await this.db
      .collection(uid)
      .doc("Notes")
      .collection("trash")
      .doc(noteId)
      .delete();
    dispatch(true);
  };

  deleteAllNotes = (notes, dispatch) => {
    notes.map((note) => {
      this.deleteNote(this.auth.currentUser.uid, note.id, note);
      dispatch(true);
    });
  };

  deleteAllTrash = (notes, dispatch) => {
    notes.map((note) => {
      this.deletePermanent(this.auth.currentUser.uid, note.id, dispatch);
    });
  };

  //add a note
  addNote = (title, text, category, date) => {
    const note = {
      Text: text,
      Title: title,
      Category: category,
      Date: date,
    };
    const uid = this.auth.currentUser.uid;
    try {
      this.db.collection(uid).doc("Notes").collection("all").add(note);
    } catch (e) {
      console.log("there's been an error adding notes: ", e);
    }
  };

  //dispatch = setNotes
  fetchTrash = (dispatch) => {
    const newNotes = [];
    const uid = this.auth.currentUser.uid;

    this.db
      .collection(uid)
      .doc("Notes")
      .collection("trash")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
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

  editNote = (title, text, category, noteId) => {
    const uid = this.auth.currentUser.uid;

    this.db.collection(uid).doc("Notes").collection("all").doc(noteId).set({
      Title: title,
      Text: text,
      // Date: date,
      Category: category,
    });
  };
}

export default Firebase;
