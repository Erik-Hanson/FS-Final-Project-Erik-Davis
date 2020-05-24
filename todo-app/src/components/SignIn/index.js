import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./main.css"; // Import CSS
import { RegisterLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { PWForgetLink } from "../PasswordForget";

import * as ROUTE from "../constants/routes";

const SignInPage = () => (
  <div className="bg-dark" id="signinPage">
    <SignInForm />
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
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <div className="card card-body my-4">
              <h2 className="h2 text-center">Log In</h2>
              <form onSubmit={this.onSubmit}>
                <input
                  className="input-group mb-4 form-control"
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={this.onChange}
                />
                <input
                  className="input-group mb-4 form-control"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <button className="btn btn-success btn-block mb-4" disabled={isInvalid} type="submit">
                  Sign In
                </button>
                {error && <p> {error.message}</p>}
              </form>
              <div className="text-center">
                <PWForgetLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
