/*
This file contains the layout for notes in the to do items list
*/

import React, { useEffect, useState, useCallback } from "react";
import ItemList from "./ItemList";
import Notes from "./Notes";
import { withRouter, useHistory } from "react-router-dom";
import { withFirebase } from "./Firebase";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Home.css";

const Item = (props) => {

  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.setUpdate(true);
  };

  return props.allNotes.map((note) => {
    let date;
    if (note.Date)
      date = note.Date.toDate().getUTCMonth() + 1 + "/" + note.Date.toDate().getUTCDate();
    return (
      <Accordion>
        <li key={note.id} className="text-center list-group-item text-capitalize">
          <div className="border border-secondary my-2">
            <Accordion.Toggle className="text-center" as={Card.Header} eventKey={note.id}>
              {note.Title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={note.id}>
              <div>
                <ul className="text-left pt-2">
                  <li><span className="font-weight-bold">Description:</span> {note.Text}</li>
                  <li><span className="font-weight-bold">Category:</span> {note.Category}</li>
                  {date &&
                    <li><span className="font-weight-bold">Due Date:</span> {date}</li>
                  }
                </ul>
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
            </Accordion.Collapse>
          </div>
        </li>
      </Accordion>
    );
  });
};

export default Item;
