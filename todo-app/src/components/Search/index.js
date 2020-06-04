import React, { useState } from "react";
import {
  Alert,
  Accordion,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const Search = (props) => {
  const [update, setUpdate] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [showAlert, setShow] = useState(false);

  const handleSearch = () => {
    if (keyword !== "") {
      setResults([]);
      setUpdate(false);
      const newResults = [];
      props.notes.forEach((note) => {
        console.log(note.Text.toUpperCase());
        if (
          note.Text.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 ||
          note.Title.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 ||
          note.Category.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
        ) {
          newResults.push(note);
        }
      });

      if (newResults.length !== 0) {
        setResults(newResults);
        setUpdate(true);
        cleanUp();
      } else {
        setShow(true);
      }
    }
  };

  const cleanUp = () => {
    document.getElementById("searchBar").value = "";
    setKeyword("");
  };

  const clearSearch = () => {
    setResults([]);
    setKeyword("");
    setUpdate(false);
  };

  const handleClose = () => {
    setShow(false);
    setKeyword("");
  };

  if (update) {
    return (
      <>
        <Form inline className="justify-content-center">
          <FormControl
            type="text"
            placeholder="Find in Notes"
            id="searchBar"
            className="mr-sm-2"
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
          <Button onClick={handleSearch} variant="outline-info">
            Search
          </Button>
        </Form>
        <hr />
        <Card bg="secondary">
          <Card.Header as="h2" className="text-center text-white">
            Search Results
          </Card.Header>
          <Card.Body>
            <Accordion>
              {results.map((note) => {
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
                  <div className="border border-secondary bg-light my-2">
                    <Accordion.Toggle
                      className="text-center text-capitalize"
                      as={Card.Header}
                      eventKey={note.id}
                    >
                      {note.Title}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={note.id}>
                      <>
                        <ul className="text-left pt-2">
                          {note.Text &&
                            <li>
                              <span className="font-weight-bold">
                                Description:
                            </span>{" "}
                              {note.Text}
                            </li>
                          }
                          {note.Category &&
                            <li>
                              <span className="font-weight-bold">Category:</span>{" "}
                              {note.Category}
                            </li>
                          }
                          {/* {props.date && ( */}
                          {note.Date && (
                            <li>
                              <span className="font-weight-bold">Date:</span>{" "}
                              {date}
                            </li>
                          )}
                        </ul>
                      </>
                    </Accordion.Collapse>
                  </div>
                );
              })}
            </Accordion>
          </Card.Body>
          <Card.Footer>
            <Button onClick={clearSearch} size="lg" block variant="danger">
              Clear
            </Button>
          </Card.Footer>
        </Card>
      </>
    );
  } else if (showAlert === true) {
    return (
      <Alert
        variant="warning"
        className="text-dark"
        onClick={() => handleClose()}
        dismissible
      >
        <Alert.Heading>No Results</Alert.Heading>
        <p>Did not find any notes for "{keyword}"</p>
      </Alert>
    );
  } else {
    return (
      <>
        <Form inline className="justify-content-center">
          <FormControl
            type="text"
            id="searchBar"
            placeholder="Find in Notes"
            className="mr-sm-2"
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
          <Button onClick={handleSearch} variant="outline-info">
            Search
          </Button>
        </Form>
      </>
    );
  }
};

export default Search;
