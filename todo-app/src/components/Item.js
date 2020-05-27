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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteNoteModal = () => {
    props.function(props.noteId, props.note);
    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        <i className="fa fa-trash"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete this note (You can get your note back from the trash)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteNoteModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Item = (props) => {
  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.setUpdate(true);
  };

  return props.allNotes.map((note) => {
    return (
      <li key={note.id} className="text-center list-group-item text-capitalize">
        <div className="border border-secondary my-2">
          <h5>{note.Title}</h5>
          <div>
            <span id="edit" className="text-success mr-2">
              <button type="submit" className="btn btn-sm">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </span>
            <span id="delete" className="text-danger">
              <DeleteModal function={deleteNote} noteId={note.id} note={note} />
            </span>
          </div>
        </div>
      </li>
    );
  });
};

export default Item;

// <button
//   type="submit"
//   className="btn btn-sm"
//   onClick={() => deleteNote(note.id, note)}
// ></button>
