import React from 'react'; 
import {withFirebase} from '../Firebase';

const SignOutButton = ({firebase}) => (

    <button type="button" onClick = {firebase.executeSignOut}>
        Log Out
    </button>

); 

export default withFirebase(SignOutButton);  