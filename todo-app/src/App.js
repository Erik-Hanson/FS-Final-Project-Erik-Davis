import React from 'react';
//import CreateItem from "./components/CreateItem";
//import ItemList from "./components/ItemList";
import Notes from "./components/Notes";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
//import './App.css'; // Import CSS
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
