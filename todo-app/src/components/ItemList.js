/*
This class is the component which will contain the list of to do items.
This component is called within App.js.
The class also contains a call to the Item component as it is composed of the
item components.
*/

import React, { Component } from 'react'
import Item from "./Item";

export default class ItemList extends Component {
    render() {
        return (
            <ul className="list-group my 3">
                <h2 className="text-center text-light">Your To Do List</h2>
                <div className="card card-body bg-secondary">
                    <Item />
                    <button type="button" className="btn btn-danger btn-block mt-4">Clear Your List</button>
                </div>
            </ul>
        )
    }
}
