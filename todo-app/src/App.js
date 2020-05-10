import React from 'react';
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import uuid from "uuid";
//import './App.css';

function App() {
  return (
    <body className="bg-dark">
      <h1 className="text-center text-light">To Do App</h1>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h2 className="text-center text-light">Create To Do Item</h2>
            <CreateItem />
            <ItemList />
          </div>
        </div>
      </div>
      <footer>Created By: Erik Hanson and Davis Giang</footer>
    </body>
  );
}

export default App;
