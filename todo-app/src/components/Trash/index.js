import React, { useEffect, useCallback, useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import "./main.css";

// const Restore = () => {
//   return <RestoreWrapped />;
// };

const DeleteModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteNoteModal = () => {
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deletePermanent(uid, props.noteIdToDelete, props.setUpdate);
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
        <Modal.Body>Permanently delete note (cannot be restored)</Modal.Body>
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

const Restore = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const restoreNote = () => {
    props.firebase.restoreNote(props.note, props.noteId, props.setUpdate);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Restore this Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You want to move note out of trash</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={restoreNote}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Trash = ({ authUser }) => {
  return <div id="auth">{authUser ? <TrashAuth /> : <TrashNonAuth />}</div>;
};

const TrashList = () => {
  return <TrashListWrapped />;
};

const TrashListBase = (props) => {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetch = useCallback(async () => {
    await props.firebase.fetchTrash(setNotes);
  }, [props.firebase]);

  // const deleteNote = (e, noteIdToDelete) => {
  //   e.preventDefault();
  //   const uid = props.firebase.auth.currentUser.uid;
  //   props.firebase.deletePermanent(uid, noteIdToDelete, setUpdate);
  // };

  useEffect(() => {
    fetch();
    setUpdate(false);
  }, [fetch, update]);

  return (
    <Container className="bg-secondary mt-5 pt-4 pb-4">
      <Accordion>
        {notes.map((note) => {
          return (
            <Card>
              <Accordion.Toggle
                className="text-center"
                as={Card.Header}
                eventKey={note.id}
              >
                {note.Title}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={note.id}>
                <Card.Body>
                  <div>Text: {note.Text}</div>
                  <div>Category: {note.Category}</div>
                  <div>
                    <span id="delete" className="text-danger">
                      <DeleteModal
                        firebase={props.firebase}
                        noteIdToDelete={note.id}
                        note={note}
                        setUpdate={setUpdate}
                      />
                    </span>
                  </div>
                  <div>
                    <Restore
                      note={note}
                      noteId={note.id}
                      setUpdate={setUpdate}
                      firebase={props.firebase}
                    />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
      <button
        type="button"
        className="btn btn-danger btn-block mt-4"
        onClick={() => props.firebase.deleteAllTrash(notes, setUpdate)}
      >
        Clear Your Trash
      </button>
    </Container>
  );
};

const TrashAuth = () => {
  return <TrashList />;
};

const TrashNonAuth = () => {
  return <p>hi</p>;
};

const TrashListWrapped = withRouter(withFirebase(TrashListBase));
// const RestoreWrapped = withRouter(withFirebase(Restore));

export default Trash;

// <button
//   type="submit"
//   className="btn btn-sm"
//   onClick={(e) => deleteNote(e, note.id)}
// ></button>
