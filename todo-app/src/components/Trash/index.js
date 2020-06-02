import React, { useEffect, useCallback, useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Accordion, Card, Button, Container, Modal } from "react-bootstrap";
import "./main.css";

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
      <Button variant="danger my-2" onClick={handleShow}>
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
  return <div id="auth">{authUser ? <TrashAuth /> : <></>}></div>;
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

  useEffect(() => {
    fetch();
    setUpdate(false);
  }, [fetch, update]);

  if (notes.length !== 0) {
    return (
      <Container className="bg-secondary mt-5 pt-4 pb-4">
        <Accordion>
          {notes.map((note) => {
            let date;
            if (typeof note.Date != "string" && note.Date) {
              console.log(typeof note.Date);
              date =
                note.Date.toDate().getUTCMonth() +
                1 +
                "/" +
                note.Date.toDate().getUTCDate() +
                "/" +
                note.Date.toDate().getUTCFullYear();
            }
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
                    {
                      note.Date && <div>Date: {date}</div>
                    }
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
  }

  else
    return (
      <h1 className="text-light h1 text-center">You have no notes in your trash</h1>
    )
};

const TrashAuth = () => {
  return <TrashList />;
};

const TrashListWrapped = withRouter(withFirebase(TrashListBase));

export default Trash;
