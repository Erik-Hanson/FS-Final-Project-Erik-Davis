import React from "react";
// import { Link, Route } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <Navbar.Brand as={Link} to={ROUTE.HOME}>
        WorkSet
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTE.HOME}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTE.NOTES}>
            Notes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
        <Nav.Link as={Link} to={ROUTE.TRASH}>
          Trash
        </Nav.Link>
      </Nav>
      <SignOutButton />
    </Navbar>
  </>
);

const NavigationNonAuth = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href={ROUTE.HOME}>To do</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to={ROUTE.HOME}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTE.SIGN_IN}>
          Sign In
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTE.REGISTER}>
          Register
        </Nav.Link>
      </Nav>
    </Navbar>
  </>
);

export default Navigation;
