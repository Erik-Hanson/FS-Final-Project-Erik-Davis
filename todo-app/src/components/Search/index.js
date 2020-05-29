import React, { useState } from "react";
import { Card, Form, FormControl, Button } from "react-bootstrap";

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
          <Card.Body></Card.Body>
          <Card.Footer>
            <Button onClick={clearSearch} size="lg" block variant="danger">
              Clear
            </Button>
          </Card.Footer>
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

//      <Button variant="outline-danger">Clear Search</Button>
