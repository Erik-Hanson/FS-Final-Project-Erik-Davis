import React from "react";

import ItemList from "./ItemList";
import "../App.css"; // Import CSS

const Notes = ({ authUser }) => (
  <>{authUser ? <NotesAuth /> : <NotesNonAuth />}</>
);

const NotesAuth = () => (
  // Below lies the backbone for the notes page
  <div className="bg-dark">
    <h1 className="display-1 text-center text-light pt-4">To Do App</h1>
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-4">
          <ItemList />
        </div>
      </div>
    </div>
    <footer className="font-weight-bold text-center text-light my-4">
      Created By: Erik Hanson and Davis Giang
    </footer>
  </div>
);

const NotesNonAuth = () => (
  // Below lies the backbone for the notes page
  <div className="bg-dark">
    <h1 className="display-1 text-center text-light pt-4">To Do App</h1>
    <div className="container">
      <h1 className="text-light text-center">
        Please sign-in to view and create notes
      </h1>
    </div>
    <footer className="font-weight-bold text-center text-light my-4">
      Created By: Erik Hanson and Davis Giang
    </footer>
  </div>
);

export default Notes;
