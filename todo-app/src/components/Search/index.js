import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const SearchPage = ({ authUser }) => {
  return <> {authUser ? <SearchPageWrapper /> : <></>} </>;
};

const SearchPageBase = (props) => {
  return (
    <Container variant="dark" fluid="sm">
      <Card bg="light">
        <Card.Header as="h5" className="text-center">
          Find in Notes
        </Card.Header>
        <Card.Body>
          <p></p>
        </Card.Body>
      </Card>
    </Container>
  );
};

const SearchPageWrapper = withRouter(withFirebase(SearchPageBase));

export default SearchPage;
