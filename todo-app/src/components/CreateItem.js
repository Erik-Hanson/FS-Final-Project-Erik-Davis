/*
This class is the component which contains the form to create an to do item.
It's called within App.js.
*/

import React, { Component } from 'react'
import './CreateItem.css';

export default class CreateItem extends Component {
    render() {
        return (
            <div className="card card-body my-3 bg-secondary">
                <form onSubmit="addItem()">
                    <div className="input-group">
                        <div className="input-group-prepend d-inline">
                            <div className="input-group-text bg-success">
                                <button type="submit" className="btn btn-sm"><i className="fa fa-plus-circle"></i></button>
                            </div>
                        </div>
                        <input type="text" id="addItem" className="form-control form-control-lg" placeholder="What needs to be done?" />
                    </div>
                </form>
            </div>
        )
    }
}
