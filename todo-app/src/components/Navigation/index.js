import React from "react";
import { Link, Route } from "react-router-dom";
import SignOutButton from "../SignOut/index";
import "./main.css";
import * as ROUTE from "../constants/routes";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light navagationBar">
      <a className="navbar-brand text-light" id="banner">
        To-Do
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">

          <a className="nav-item nav-link active pt-3 linky">
            <Link to={ROUTE.NOTES}>Notes</Link>
          </a>
          <a className="nav-item nav-link pt-3 linky">
            <Link to={ROUTE.TRASH}>Trashed Notes</Link>
          </a>
          <div id="logout">
            <a className="nav-item nav-link">
              <SignOutButton />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

const NavigationNonAuth = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <a className="navbar-brand text-light" id="banner">
        To Do
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav" id="mainNavBar">
          <a className="nav-item nav-link linky">
            <Link to={ROUTE.SIGN_IN}>Sign In</Link>
          </a>
          <a className="nav-item nav-link linky">
            <Link to={ROUTE.HOME}>Home</Link>
          </a>
        </div>
      </div>
    </nav>
  </header>
);

export default Navigation;
