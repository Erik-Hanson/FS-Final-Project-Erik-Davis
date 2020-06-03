import React from "react";
import { withFirebase } from "../Firebase";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as ROUTE from "../constants/routes";

const SignOutButton = ({ firebase }) => (
  <Button
    as={Link}
    to={ROUTE.HOME}
    variant="outline-info"
    onClick={firebase.executeSignOut}
  >
    Log Out
  </Button>
);

export default withFirebase(SignOutButton);
