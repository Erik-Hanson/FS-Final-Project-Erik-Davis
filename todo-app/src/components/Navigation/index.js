import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTE from "../constants/routes";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
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
      <div
        className="collapse navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">
            Notes <span className="sr-only"></span>
          </a>
          <a className="nav-item nav-link" href="#">
            Trashed Notes
          </a>
        </div>
      </div>
    </nav>
  </header>
);

const NavigationNonAuth = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navigation
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
      <div
        className="collapse navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
            <Link to={ROUTE.SIGN_IN}>Sign In</Link>
        </div>
      </div>
    </nav>
  </header>
);



export default Navigation;