import React from "react";
//import CreateItem from "./components/CreateItem";
//import ItemList from "./components/ItemList";
import Notes from "./components/Notes";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
//import './App.css'; // Import CSS
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import Navigation from './components/Navigation';
//import LandingPage from './components/Landing';
import RegisterPage from "./components/SignUp";
import SignInPage from './components/SignIn';
//import PasswordForgetPage from './components/PasswordForget';
//import HomePage from './components/Home';
//import AccountPage from './components/Account';

import * as ROUTE from "./components/constants/routes";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={ROUTE.NOTES} component={Notes}></Route>
          <Route path={ROUTE.REGISTER} component={RegisterPage}></Route>
          <Route path={ROUTE.SIGN_IN} component={SignInPage}></Route>
          <Route path={ROUTE.HOME} component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
