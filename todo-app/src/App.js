import React, { Component } from "react";
//import CreateItem from "./components/CreateItem";
//import ItemList from "./components/ItemList";
import Notes from "./components/Notes";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import { withFirebase } from "./components/Firebase";
//import './App.css'; // Import CSS
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation/index";
//import LandingPage from './components/Landing';
import RegisterPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PWForgetPage from "./components/PasswordForget";
import Trash from "./components/Trash";
import SearchPage from "./components/Search";

import * as ROUTE from "./components/constants/routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <div>
        <Router>
          <Navigation authUser={this.state.authUser} />
          <Switch>
            <Route path={ROUTE.NOTES}>
              <Notes authUser={this.state.authUser} />
            </Route>
            <Route path={ROUTE.REGISTER} component={RegisterPage}></Route>
            <Route path={ROUTE.SIGN_IN} component={SignInPage}></Route>
            <Route path={ROUTE.PW_FORGET} component={PWForgetPage}></Route>
            <Route path={ROUTE.SEARCH}>
              <SearchPage authUser={this.state.authUser} />
            </Route>
            <Route path={ROUTE.TRASH}>
              <Trash authUser={this.state.authUser} />
            </Route>
            <Route path={ROUTE.HOME} component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);
