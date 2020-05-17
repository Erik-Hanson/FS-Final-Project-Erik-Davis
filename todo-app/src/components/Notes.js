import React from 'react';
import { Component } from "react";
import CreateItem from "./CreateItem";
import ItemList from "./ItemList";
import '../App.css'; // Import CSS

export default class Notes extends Component {
    render() {
        return (
            // Below lies the backbone for the notes page, this should eventually be made into
            // its own component as we are probably going to use this file for routing since
            // we will have multiple pages
            <body className="bg-dark">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Navigation</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-item nav-link active" href="#">Notes <span className="sr-only">(current)</span></a>
                                <a className="nav-item nav-link" href="#">Trashed Notes</a>
                            </div>
                        </div>
                    </nav>
                </header>

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
}