import React, { useEffect, useCallback, useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Trash = ({ authUser }) => {
  return <div>{authUser ? <TrashAuth /> : <TrashNonAuth />}</div>;
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
    setUpdate(true);
  }, [fetch, update]);

  //console.log(notes);
  return (
    <Container>
      <Accordion>
        {notes.map((note) => {
          return (
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={note.id}>
                {note.Title}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={note.id}>
                <Card.Body>
                  <div>Text: {note.Text}</div>
                  <div>Category: {note.Category}</div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
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
