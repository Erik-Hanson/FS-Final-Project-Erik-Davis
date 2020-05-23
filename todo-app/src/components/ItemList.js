/*
This class is the component which will contain the list of to do items.
This component is called within App.js.
The class also contains a call to the Item component as it is composed of the
item components.
*/

import React, { Component, useEffect, useLayoutEffect } from "react";
import Item from "./Item";
import { withRouter } from "react-router-dom";
import Firebase, { withFirebase } from "./Firebase";

const ItemList = () => {
  return <ItemListWrapped />;
};

const ItemListBase = (props) => {
  const [notes, setNotes] = React.useState([]);

  //   const fetch = React.useCallback(async () => {
  //     const uid = props.firebase.auth.currentUser.uid;
  //     //console.log(uid);
  //     const newNotes = await props.firebase.fetchAllNotes(uid);
  //     //console.log(newNotes);
  //     //console.log("this.firebase.auth.currentUser.uid");
  //     setNotes(newNotes);
  //     console.log(newNotes);
  //     //console.log(newNotes.length);
  //   }, [props.firebase]);

  //   useEffect(() => {
  //     fetch();
  //   }, []);

  useEffect(() => {
    async function fetch() {
      const uid = await props.firebase.auth.currentUser.uid;
      //console.log(uid);
      const newNotes = await props.firebase.fetchAllNotes(uid);
      //console.log(newNotes);
      //console.log("this.firebase.auth.currentUser.uid");
      setNotes(newNotes);
      //await display(notes);
      console.log(newNotes, "This is fetches array console log");
      //   await console.log(notes.length);
    }

    // function display(propToPass) {
    //   //<Item allNotes={propToPass} />
    //   //   return (

    //   //   );
    //   console.log(
    //     propToPass,
    //     "This is displays array",
    //     propToPass.length,
    //     " ",
    //     typeof propToPass
    //   );
    //   //console.log(propToPass.length);
    // }
    fetch();
  }, []);

  console.log("this is notes", notes, notes.length);
  //   return (
  //     <div class="container">
  //       <p>Notes</p>
  //       {notes.map((note) => {
  //         console.log("hi", note, "this is note1");
  //         return <p key={note.id}>{note.Title}</p>;
  //       })}
  //     </div>
  //   );

  //   async function fetch() {
  //     const uid = await props.firebase.auth.currentUser.uid;
  //     //console.log(uid);
  //     const newNotes = await props.firebase.fetchAllNotes(uid);
  //     //console.log(newNotes);
  //     //console.log("this.firebase.auth.currentUser.uid");
  //     setNotes(newNotes);
  //     console.log(newNotes);
  //     await console.log(notes.length);
  //   }

  //   useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  // JUST COMMENTED OUT
  //   console.log("this is notes", notes);
  //   return notes.map((note) => {
  //     console.log("hi", note, "this is note1");
  //     return <p>{note.Title}</p>;
  //   });

  // const display = (noteProp) => {
  //     return (
  //         <ul className="list-group my 3">
  //           <h2 className="text-center text-light">Your List</h2>
  //           <div className="card card-body bg-secondary">
  //             <Item allNotes={notes} />
  //             <button type="button" className="btn btn-danger btn-block mt-4">
  //               Clear Your List
  //             </button>
  //           </div>
  //         </ul>
  //       );
  // };

  return (
    <ul className="list-group my 3">
      <h2 className="text-center text-light">Your List</h2>
      <div className="card card-body bg-secondary">
        <Item allNotes={notes} />
        <button type="button" className="btn btn-danger btn-block mt-4">
          Clear Your List
        </button>
      </div>
    </ul>
  );
};

const ItemListWrapped = withRouter(withFirebase(ItemListBase));

export default ItemList;

export { ItemListWrapped };
