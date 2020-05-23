import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTE from "../constants/routes";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  password2: "",
  error: null,
};

const RegisterPage = () => (
  <div>
    <h1>Register</h1>
    <RegisterForm />
  </div>
);

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, password } = this.state;
    this.props.firebase
      .executeCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.firebase.addUserToFirestore(
          this.props.firebase.auth.currentUser.uid
        );
      })
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
    const { username, email, password, password2, error } = this.state;
    const validate =
      email === "" ||
      password === "" ||
      password !== password2 ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <label>Desired username</label>
        <input
          name="username"
          value={username}
          type="text"
          onChange={this.onChange}
          placeholder="Username123"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="Example@exmaple.com"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={this.onChange}
          placeholder="Confirm password"
        />
        <button disabled={validate} type="submit">
          Register
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegisterLink = () => (
  <p>
    Register to Create a To-do List <Link to={ROUTE.REGISTER}>Register</Link>
  </p>
);

const RegisterForm = withRouter(withFirebase(RegisterFormBase));

export default RegisterPage;

export { RegisterLink, RegisterForm };
