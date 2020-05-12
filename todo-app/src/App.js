import React from 'react';
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import uuid from "uuid"; // Importing uuid
import './App.css'; // Import CSS

function App() {
  return (
    <body className="bg-dark">
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
      <footer className="font-weight-bold text-center text-light my-4">Created By: Erik Hanson and Davis Giang</footer>
    </body>
  );
}

export default App;
