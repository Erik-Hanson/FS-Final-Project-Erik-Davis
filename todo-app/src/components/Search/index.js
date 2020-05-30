import React, { useState } from "react";
import { Accordion, Card, Form, FormControl, Button } from "react-bootstrap";

const Search = (props) => {
  const [update, setUpdate] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const newResults = [];
    props.notes.forEach((note) => {
      if (
        note.Text.indexOf(keyword) !== -1 ||
        note.Title.indexOf(keyword) !== -1 ||
        note.Category.indexOf(keyword) !== -1
      ) {
        newResults.push(note);
      }
    });
    setResults(newResults);
    setUpdate(true);
  };

  const clearSearch = () => {
    setResults([]);
    setUpdate(false);
  };

  if (update) {
    return (
      <>
        <Form inline className="justify-content-center">
          <FormControl
            type="text"
            placeholder="Find in Notes"
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
                  <div className="border border-secondary bg-light my-2">
                    <Accordion.Toggle
                      className="text-center"
                      as={Card.Header}
                      eventKey={note.id}
                    >
                      {note.Title}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={note.id}>
                      <>
                        <ul className="text-left pt-2">
                          <li>
                            <span className="font-weight-bold">Description:</span>{" "}
                            {note.Text}
                          </li>
                          <li>
                            <span className="font-weight-bold">Category:</span>{" "}
                            {note.Category}
                          </li>
                          {/* {props.date && ( */}
                          {note.Date &&
                            <li>
                              <span className="font-weight-bold">Date:</span> {date}
                            </li>
                          }
                        </ul>
                      </>
                    </Accordion.Collapse>
                  </div>
                );
              })}
            </Accordion>
          </Card.Body>
          <Card.Footer>            <Button onClick={clearSearch} size="lg" block variant="danger">
            Clear
            </Button></Card.Footer>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Form inline className="justify-content-center">
          <FormControl
            type="text"
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
