import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { withFirebase } from "../Firebase";
import * as ROUTE from "../constants/routes";

const PWForgetPage = () => (
  <div className="bg-dark" id="forgotpsswdPage">
    <PWForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PWForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .executePWReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <div className="card card-body my-4">
              <h1 className="h1 text-center">Forgot Password</h1>
              <form onSubmit={this.onSubmit}>
                <label>Enter Email Address:</label>
                <input
                  className="input-group mb-4 form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
                <button
                  className="btn btn-success btn-block"
                  disabled={isInvalid}
                  type="submit"
                >
                  Reset My Password
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

const PWForgetLink = () => (
  <Link style={{ color: "red" }} to={ROUTE.PW_FORGET}>
    Forgot Password?
  </Link>
);

export default PWForgetPage;

const PWForgetForm = withFirebase(PWForgetFormBase);

export { PWForgetForm, PWForgetLink };
