import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./main.css"; // Import CSS
import { RegisterLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { PWForgetLink } from "../PasswordForget";
import { Form, Button } from "react-bootstrap";

import * as ROUTE from "../constants/routes";

const SignInPage = () => (
  <div className="bg-dark" id="signinPage">
    <SignInForm />
    <SignInGoogle />
    <RegisterLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .executeSignInWithGoogle()
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTE.NOTES);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <Form className="text-center" onSubmit={this.onSubmit}>
        <Button variant="danger" type="submit" className="mb-2">
          Sign in with Google
          <img
            className="pl-2"
            width="30px"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

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
              <h1 className="h1 text-center">Log In</h1>
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
                <button
                  className="btn btn-success btn-block mb-4"
                  disabled={isInvalid}
                  type="submit"
                >
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
const SignInGoogle = withRouter(withFirebase(SignInGoogleBase));

export default SignInPage;

export { SignInForm, SignInGoogle };
