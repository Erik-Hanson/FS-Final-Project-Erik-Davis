import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (

    <button type="button" className="btn btn-danger" onClick={firebase.executeSignOut}>
        Log Out
    </button>

);

export default withFirebase(SignOutButton);  