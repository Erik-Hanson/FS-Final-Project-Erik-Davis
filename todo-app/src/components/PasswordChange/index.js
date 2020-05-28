import React, { Component } from "react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  password: "",
  password2: "",
  error: null,
};

class PWChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { password } = this.state;

    this.props.firebase
      .executePWUpdate(password)
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
    const { password, password2, error } = this.state;

    const isInvalid = password !== password2 || password === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="password2"
          value={password2}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PWChangeForm);
