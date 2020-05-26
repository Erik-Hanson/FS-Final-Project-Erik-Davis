/*
This class contains the layout for an object. As of right now the values
are hardcoded but should eventually be switched to populate the items
using data from a database. This component is called within the ItemList
component.
*/

import React, { useEffect, useState, useCallback } from "react";
import ItemList from "./ItemList";
import Notes from "./Notes";
import { withRouter, useHistory } from "react-router-dom";
import { withFirebase } from "./Firebase";

const Item = (props) => {

  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.setUpdate(true);
  };

  return props.allNotes.map((note) => {
    if (note.Date)
      var date = note.Date.toDate().getUTCMonth() + 1 + "/" + note.Date.toDate().getUTCDate();
    return (
      <li key={note.id} className="text-center list-group-item text-capitalize">
        <div className="border border-secondary my-2">
          <h5>{note.Title}</h5>
          <ul className="text-left">
            <li>Description: {note.Text}</li>
            <li>Category: {note.Category}</li>
            {note.Date &&
              <li>Date Due: {date}</li>
            }
          </ul>
          <div>
            <span id="edit" className="text-success mr-2">
              <button type="submit" className="btn btn-sm">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </span>
            <span id="delete" className="text-danger">
              <button
                type="submit"
                className="btn btn-sm"
                onClick={() => deleteNote(note.id, note)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </span>
          </div>
        </div>
      </li>
    );
  });
};

export default Item;
