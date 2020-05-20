import React from "react";
import { Component } from "react";
import CreateItem from "./CreateItem";
import ItemList from "./ItemList";
import "../App.css"; // Import CSS
import { FirebaseContext, withFirebase } from "./Firebase";
import Navigation from "./Navigation"
class Notes extends Component {
  render() {
    return (
      // Below lies the backbone for the notes page, this should eventually be made into
      // its own component as we are probably going to use this file for routing since
      // we will have multiple pages
          <body className="bg-dark">
                          <Navigation/>
        <h1 className="display-1 text-center text-light">To Do App</h1>
            <div className="container">
              <div className="row">
                <div className="col-10 mx-auto col-md-8 mt-4">
                  <h2 className="text-center text-light">Create To Do Item</h2>
                  <CreateItem />
                  <ItemList />
                </div>
              </div>
            </div>
            <footer className="font-weight-bold text-center text-light my-4">
              Created By: Erik Hanson and Davis Giang
            </footer>
          </body>
    );
  }
}

export default Notes;
