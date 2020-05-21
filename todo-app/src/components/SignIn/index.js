import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { RegisterLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { PWForgetLink } from "../PasswordForget";

import * as ROUTE from "../constants/routes";

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PWForgetLink />
    <RegisterLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .executeSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTE.NOTES);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email Address"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={this.onChange}
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p> {error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
