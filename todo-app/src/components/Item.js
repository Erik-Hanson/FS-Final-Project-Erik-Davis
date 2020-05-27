/*
This file contains the layout for notes in the to do items list
*/

import React, { useState } from "react";
// import { withRouter, useHistory } from "react-router-dom";
// import { withFirebase } from "./Firebase";
import Datepicker from "react-date-picker";
import {
  Modal,
  Button,
  Accordion,
  Card,
  Col,
  Row,
  Form,
} from "react-bootstrap";

//Modal for deleting
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

//Editing
const Edit = (props) => {
  const [editMode, setEdit] = useState(false);
  const [noteText, setNoteText] = useState(props.note.Text);
  const [noteTitle, setNoteTitle] = useState(props.note.Title);
  const [category, setCategory] = useState(props.note.Category);
  const [date, setDate] = useState(props.note.date);
  //const [note, setNote] = useState(props.note);

  // const fetch = async () => {
  //   await props.firebase.fetchNote(note.id, setNote);
  // };

  // useEffect(() => {
  //   fetch();
  //   setEdit(false);
  // }, []);

  const toggleEdit = () => {
    if (editMode === true) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const submitEdit = async () => {
    await props.firebase.editNote(noteTitle, noteText, category, props.note.id);
    toggleEdit();
    props.updateNotes(true);
  };

  if (editMode === true) {
    return (
      <>
        <Form>
          <li>
            <span className="font-weight-bold">Title:</span>{" "}
            <input
              type="text"
              onChange={(e) => {
                setNoteTitle(e.currentTarget.value);
              }}
              defaultValue={props.note.Title}
            />
          </li>
          <li>
            <span className="font-weight-bold">Description:</span>{" "}
            <input
              type="text"
              onChange={(e) => setNoteText(e.currentTarget.value)}
              defaultValue={props.note.Text}
            />
          </li>
          <li>
            <span className="font-weight-bold">Category:</span>{" "}
            <input
              type="text"
              onChange={(e) => setCategory(e.currentTarget.value)}
              defaultValue={props.note.Category}
            />
          </li>
          {/* {props.date && ( */}
          <li>
            <span className="font-weight-bold">Due Date:</span>
            {/* {props.date} */}
            {/* <div className="text-center"> */}
            {/* <span className="bg-light border-0">
            <Datepicker onChange={changeDate} value={date} />
            <span class="glyphicon glyphicon-calendar"></span>
          </span> */}
            {/* </div> */}
          </li>
          {/* )} */}
          <span id="edit" className="text-success mr-2">
            <Button variant="primary" className="btn" onClick={toggleEdit}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Button>
          </span>
          <div>
            <Button variant="success" size="sm" onClick={submitEdit}>
              Confirm
            </Button>
          </div>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <li>
          <span className="font-weight-bold">Description:</span>{" "}
          {props.note.Text}
        </li>
        <li>
          <span className="font-weight-bold">Category:</span>{" "}
          {props.note.Category}
        </li>
        {/* {props.date && ( */}
        <li>
          <span className="font-weight-bold">Due Date:</span> {props.date}
        </li>
        {/* )} */}
        <span id="edit" className="text-success mr-2">
          <Button variant="primary" className="btn" onClick={toggleEdit}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Button>
        </span>
      </>
    );
  }
};

//Item
const Item = (props) => {
  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deleteNote(
      uid,
      noteIdToDelete,
      noteToDelete,
      props.setUpdate
    );
  };

  return props.allNotes.map((note) => {
    let date;
    if (note.Date)
      date =
        note.Date.toDate().getUTCMonth() +
        1 +
        "/" +
        note.Date.toDate().getUTCDate();
    return (
      <Accordion>
        <li
          key={note.id}
          className="text-center list-group-item text-capitalize"
        >
          <div className="border border-secondary my-2">
            <Accordion.Toggle
              className="text-center"
              as={Card.Header}
              eventKey={note.id}
            >
              {note.Title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={note.id}>
              <div>
                <ul className="text-left pt-2">
                  <Edit
                    note={note}
                    date={date}
                    firebase={props.firebase}
                    updateNotes={props.setUpdate}
                  />
                </ul>
                <span id="delete" className="text-danger">
                  <DeleteModal
                    function={deleteNote}
                    noteId={note.id}
                    note={note}
                  />
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
