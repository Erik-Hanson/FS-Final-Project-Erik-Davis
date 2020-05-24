/*
This class contains the layout for an object. As of right now the values
are hardcoded but should eventually be switched to populate the items
using data from a database. This component is called within the ItemList
component.
*/

import React, { useEffect, useState, useCallback } from "react";
import ItemList from "./ItemList";
import Notes from "./Notes"
import { withRouter, useHistory } from "react-router-dom";
import { withFirebase } from "./Firebase";

const Item = (props) => {
  const [update, doUpdate] = useState(false);

  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    //props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete, doUpdate);
  }

  // const fetch = () => {
  //   const uid = props.firebase.auth.currentUser.uid;
  //   props.firebase.fetchAllNotes(uid, setNotes);
  // };

  useEffect(() => {
    //fetch();
    //return <Item allNotes={notes} firebase={props.firebase} />
    //return ItemList();
  }, [update])

  return props.allNotes.map((note) => {
    return (
      <li key={note.id} className="text-center list-group-item text-capitalize">
        <div className="border border-secondary my-2">
          <h5>{note.Title}</h5>
          <div>
            <span id="edit" className="text-success mr-2">
              <button type="submit" className="btn btn-sm"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            </span>
            <span id="delete" className="text-danger">
              <button type="submit" className="btn btn-sm" onClick={() => deleteNote(note.id, note)}><i className="fa fa-trash"></i></button>
            </span>
          </div>
        </div>
      </li>
    )
  });
};

export default Item;