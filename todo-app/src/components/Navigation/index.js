import React from "react";
// import { Link, Route } from "react-router-dom";
import SignOutButton from "../SignOut/index";
import "./main.css";
import * as ROUTE from "../constants/routes";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href={ROUTE.NOTES}>To do</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href={ROUTE.HOME}>Home</Nav.Link>
        <Nav.Link href={ROUTE.NOTES}>Notes</Nav.Link>
        <Nav.Link href={ROUTE.TRASH}>Trash</Nav.Link>
      </Nav>
      <SignOutButton />
    </Navbar>
  </>
);

const NavigationNonAuth = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href={ROUTE.NOTES}>To do</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href={ROUTE.HOME}>Home</Nav.Link>
        <Nav.Link href={ROUTE.SIGN_IN}>Sign In</Nav.Link>
        <Nav.Link href={ROUTE.REGISTER}>Register</Nav.Link>
      </Nav>
    </Navbar>
  </>
);

export default Navigation;
