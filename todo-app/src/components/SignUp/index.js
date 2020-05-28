import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./main.css";
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
  <div className="bg-dark" id="registerPage">
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
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <div className="card card-body my-4">
              <h2 className="h2 text-center">Register</h2>
              <form onSubmit={this.onSubmit}>
                <label>Desired username</label>
                <input
                  className="input-group mb-4 form-control"
                  name="username"
                  value={username}
                  type="text"
                  onChange={this.onChange}
                  placeholder="Username"
                />
                <label>Email</label>
                <input
                  className="input-group mb-4 form-control"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="Example@example.com"
                />
                <label>Password</label>
                <input
                  className="input-group mb-4 form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  placeholder="Password"
                />
                <label>Confirm Password</label>
                <input
                  className="input-group mb-4 form-control"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                  placeholder="Confirm password"
                />
                <button
                  className="btn btn-success btn-block"
                  disabled={validate}
                  type="submit"
                >
                  Register
                </button>
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const RegisterLink = () => (
  <p className="text-light text-center">
    Don't have an account?{" "}
    <Link style={{ color: "blue" }} to={ROUTE.REGISTER}>
      Register
    </Link>
  </p>
);

const RegisterForm = withRouter(withFirebase(RegisterFormBase));

export default RegisterPage;

export { RegisterLink, RegisterForm };
