import React from 'react';
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
//import './App.css';

function App() {
  return (
    <body>
      <h1>Notes</h1>
      <div id="notes-section">
        <CreateItem />
        <ItemList />
      </div>
      <footer>Created By: Erik Hanson and Davis Giang</footer>
    </body>
  );
}

export default App;
