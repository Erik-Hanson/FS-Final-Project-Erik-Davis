import React from 'react';
import { Link, Route } from 'react-router-dom';
import SignOutButton from "../SignOut/index";
import * as ROUTE from "../constants/routes";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">To-Do</a>
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
          <a className="nav-item nav-link active"><Link to={ROUTE.NOTES}>Notes</Link></a>
          <a className="nav-item nav-link"><Link to={ROUTE.TRASH}>Trashed Notes</Link></a>
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
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav" id="mainNavBar">
          <a className="nav-item nav-link"><Link to={ROUTE.SIGN_IN}>Sign In</Link></a>
          <a className="nav-item nav-link"><Link to={ROUTE.HOME}>Home</Link></a>
        </div>
      </div>
    </nav>
  </header>
);



export default Navigation;