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
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
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

  executeSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  // add user
  addUserToFirestore = (uid) => {
    const newNote = {
      Text: "This is your first Note",
      Date: new Date(),
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
      Category: note.Category,
      Title: note.Title,
    };
    if (note.Date) {
      newNote.Date = note.Date;
    }

    this.db.collection(uid).doc("Notes").collection("trash").add(newNote);
  };

  restoreNote = async (note, noteId, dispatch) => {
    const uid = this.auth.currentUser.uid;
    const newNote = {
      Text: note.Text,
      Category: note.Category,
      Title: note.Title,
    };

    if (note.Date) {
      newNote.Date = note.Date;
    }

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
    /*
    notes.map((note) => {
      this.deleteNote(this.auth.currentUser.uid, note.id, note);
      dispatch(true);
    });
    */

    notes.forEach((note) => {
      this.deleteNote(this.auth.currentUser.uid, note.id, note);
      dispatch(true);
    });
  };

  deleteAllTrash = (notes, dispatch) => {
    const uid = this.auth.currentUser.uid;
    notes.forEach((note) => {
      this.db
        .collection(uid)
        .doc("Notes")
        .collection("trash")
        .doc(note.id)
        .delete();
    });
    dispatch(true);
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

  editNote = async (title, text, date, category, noteId, dispatch) => {
    const uid = this.auth.currentUser.uid;

    const newNote = {
      Title: title,
      Text: text,
      Category: category,
    };

    if (date) {
      newNote.Date = date;
    }

    await this.db
      .collection(uid)
      .doc("Notes")
      .collection("all")
      .doc(noteId)
      .set(newNote);
    dispatch(true);
  };
}

export default Firebase;
