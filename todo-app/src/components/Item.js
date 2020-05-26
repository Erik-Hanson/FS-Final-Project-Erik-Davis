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
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const Item = (props) => {
  //const [update, doUpdate] = useState(false);

  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    //props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.setUpdate(true);
  };

  // const fetch = () => {
  //   const uid = props.firebase.auth.currentUser.uid;
  //   props.firebase.fetchAllNotes(uid, setNotes);
  // };

  // useEffect(() => {
  //   //fetch();
  //   //return <Item allNotes={notes} firebase={props.firebase} />
  //   //return ItemList();
  //   console.log("testing");
  // }, [update])

  /*
        <Accordion>
        {notes.map((note) => {
          return (
            <Card>
              <Accordion.Toggle className="text-center" as={Card.Header} eventKey={note.id}>
                {note.Title}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={note.id}>
                <Card.Body>
                  <div>Text: {note.Text}</div>
                  <div>Category: {note.Category}</div>
                  <span id="delete" className="text-danger">
                    <button
                      type="submit"
                      className="btn btn-sm"
                      onClick={(e) => deleteNote(e, note.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </span>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
      */

  return props.allNotes.map((note) => {
    return (
      <Accordion>
        <li key={note.id} className="text-center list-group-item text-capitalize">
          <div className="border border-secondary my-2">
            <Accordion.Toggle className="text-center" as={Card.Header} eventKey={note.id}>
              {note.Title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={note.id}>
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
            </Accordion.Collapse>
          </div>
        </li>
      </Accordion>
    );
  });
};

export default Item;
