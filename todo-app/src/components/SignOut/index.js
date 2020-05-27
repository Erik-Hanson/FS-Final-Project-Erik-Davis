import React from "react";
import { withFirebase } from "../Firebase";
import Button from "react-bootstrap/Button";

const SignOutButton = ({ firebase }) => (
  <Button variant="outline-info" onClick={firebase.executeSignOut}>
    Log Out
  </Button>
);

export default withFirebase(SignOutButton);
