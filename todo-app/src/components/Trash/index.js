import React, { useEffect, useCallback, useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./main.css"

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

  const deleteNote = (e, noteIdToDelete) => {
    e.preventDefault();
    const uid = props.firebase.auth.currentUser.uid;
    props.firebase.deletePermanent(uid, noteIdToDelete, setUpdate);
    //setUpdate(true);
  };

  useEffect(() => {
    fetch();
    setUpdate(false);
  }, [fetch, update]);

  //console.log(notes);
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

export default Trash;
