/*
This file contains the layout for notes in the to do items list
*/

import React, { useState } from "react";
// import { withRouter, useHistory } from "react-router-dom";
// import { withFirebase } from "./Firebase";
import Datepicker from "react-date-picker";
import { Modal, Button, Accordion, Card, Form } from "react-bootstrap";
import "./Item.css";

//Clear All Modal
const DeleteAll = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAllModal = async () => {
    await props.firebase.deleteAllNotes(props.notes, props.setUpdate);
    handleClose();
    props.setUpdate(false);
  };

  return (
    <>
      <Button className="btn-block mt-4" variant="danger" onClick={handleShow}>
        Delete All
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete all Notes (You can restore them from your trash)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteAllModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

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
      <Button className="mb-2" variant="danger" onClick={handleShow}>
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
  // const [date, setDate] = useState(props.date);
  const [pickerDate, setPickerDate] = useState(props.dateObj);

  //const [note, setNote] = useState(props.note);

  const toggleEdit = () => {
    if (editMode === true) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const submitEdit = async () => {
    await props.firebase.editNote(
      noteTitle,
      noteText,
      pickerDate,
      category,
      props.note.id,
      props.updateNotes
    );
    toggleEdit();
    props.updateNotes(false);
  };

  if (editMode === true) {
    return (
      <>
        <Form>
          <ul className="text-left pt-2">
            <li className="pt-2">
              <span className="font-weight-bold">Title:</span>{" "}
              <input
                type="text"
                onChange={(e) => {
                  setNoteTitle(e.currentTarget.value);
                }}
                defaultValue={props.note.Title}
              />
            </li>
            <li className="pt-2">
              <span className="font-weight-bold">Description:</span>{" "}
              <input
                type="text"
                onChange={(e) => setNoteText(e.currentTarget.value)}
                defaultValue={props.note.Text}
              />
            </li>
            <li className="pt-2">
              <span className="font-weight-bold">Category:</span>{" "}
              <input
                type="text"
                onChange={(e) => setCategory(e.currentTarget.value)}
                defaultValue={props.note.Category}
              />
            </li>
            <li className="pt-2">
              <span className="font-weight-bold">Due Date:</span>
              {/* {props.date} */}
              <span className="bg-light border-0 ml-2">
                <Datepicker
                  onChange={(e) => setPickerDate(e)}
                  value={pickerDate}
                />
                <span class="glyphicon glyphicon-calendar"></span>
              </span>
            </li>
          </ul>
          <span>
            <Button
              className="my-2"
              variant="success"
              size="sm"
              onClick={submitEdit}
            >
              Confirm
            </Button>
          </span>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <ul className="text-left pt-2">
          {props.note.Text &&
            <li>
              <span className="font-weight-bold">Description:</span>{" "}
              {props.note.Text}
            </li>
          }
          {props.note.Category &&
            <li>
              <span className="font-weight-bold">Category:</span>{" "}
              {props.note.Category}
            </li>
          }
          {/* {props.date && ( */}
          {props.note.Date && (
            <li>
              <span className="font-weight-bold">Date:</span> {props.date}
            </li>
          )}
        </ul>
        {/* )} */}
        <span id="edit" className="text-success mr-2">
          <Button variant="primary" className="btn mb-2" onClick={toggleEdit}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Button>
        </span>
        <span id="delete" className="text-danger">
          <DeleteModal
            function={props.deleteNote}
            noteId={props.note.id}
            note={props.note}
          />
        </span>
      </>
    );
  }
};

//Item
const Item = (props) => {
  const deleteNote = (noteIdToDelete, noteToDelete) => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deleteNote(uid, noteIdToDelete, noteToDelete);
    props.setUpdate(true);
  };

  return (
    <Card bg="secondary">
      <Card.Header as="h2" className="text-center text-white">
        All your Notes
      </Card.Header>
      <Card.Body>
        <Accordion>
          {props.allNotes.map((note) => {
            let date;
            let dateObj;
            if (typeof note.Date != "string" && note.Date) {
              console.log(typeof note.Date);
              date =
                note.Date.toDate().getUTCMonth() +
                1 +
                "/" +
                note.Date.toDate().getUTCDate() +
                "/" +
                note.Date.toDate().getUTCFullYear();
              dateObj = note.Date.toDate();
            }
            return (
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
                      {/*<ul className="text-left pt-2">*/}
                      <Edit
                        note={note}
                        date={date}
                        dateObj={dateObj}
                        firebase={props.firebase}
                        updateNotes={props.setUpdate}
                        deleteNote={deleteNote}
                      />
                      {/*</ul>*/}
                    </div>
                  </Accordion.Collapse>
                </div>
              </li>
            );
          })}
        </Accordion>
      </Card.Body>
      <Card.Footer>
        <DeleteAll
          firebase={props.firebase}
          notes={props.allNotes}
          setUpdate={props.setUpdate}
        />
      </Card.Footer>
    </Card>
  );
};

export default Item;
