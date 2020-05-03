import React, { Component } from 'react'
import Item from "./Item";

export default class ItemList extends Component {
    render() {
        return (
            <div>
               <h1>To Do Items</h1>
               <Item />
            </div>
        )
    }
}
