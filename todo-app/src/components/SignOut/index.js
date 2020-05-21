import React from 'react'; 
import {withFirebase} from '../Firebase';

const SignOutButton = ({firebase}) => (
    <div className="float-right">
        <button className="btn btn-primary" type="button" onClick = {firebase.executeSignOut}>Log Out</button>
    </div>
); 

export default withFirebase(SignOutButton);  