/*
This class is the component which contains the form to create an to do item.
It's called within App.js.
*/

//import React, { Component } from 'react'
import React, { useEffect, useState, useCallback, useRef } from "react";
import "./CreateItem.css";
import { withRouter } from "react-router-dom";
import { withFirebase } from "./Firebase";
import ItemList from "./ItemList";
import DatePicker from "react-date-picker";

const CreateItem = () => {
  return <CreateItemWrapped />;
};

const CreateItemBase = (props) => {
  //const [note, setNote] = useState();
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const changeDate = (newDate) => {
    setDate(newDate);
  };

  const changeText = (newText) => {
    setNoteText(newText);
  };

  const changeTitle = (newTitle) => {
    setNoteTitle(newTitle);
  };

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const submitNote = () => {
    // const newNote = {
    //   Title: noteTitle,
    //   Text: noteText,
    //   Category: category,
    //   Date: date,
    // };
    console.log("this is new note");
    // props.firebase.addNote(newNote, setNote);
    props.firebase.addNote(noteTitle, noteText, category, date);
  };

  return (
    <div className="card card-body my-3 bg-secondary">
      <form onSubmit="">
        <div className="input-group">
          <div className="input-group-prepend d-inline">
            <div className="input-group-text">
              <label for="Title">Title</label>
            </div>
          </div>
          <input
            type="text"
            id="Title"
            name="itemText"
            className="form-control form-control-lg"
            onChange={(e) => changeTitle(e.currentTarget.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-group-prepend d-inline">
            <div className="input-group-text bg-success">
              <button onClick={submitNote} type="submit" className="btn btn-sm">
                <i className="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>

          <input
            type="text"
            id="addItem"
            name="itemText"
            className="form-control form-control-lg"
            onChange={(x) => changeText(x.currentTarget.value)}
          />
        </div>
        <div className="input-group">
          <div className="input-group-prepend d-inline">
            <div className="input-group-text">
              <label for="Title">Category</label>
            </div>
          </div>
          <input
            type="text"
            id="Title"
            name="itemText"
            className="form-control form-control-lg"
            onChange={(x) => changeCategory(x.currentTarget.value)}
          />
        </div>
        <div class="form-group">
          <div class="input-group date" id="datetimepicker1">
            <input type="text" class="form-control" />
            <span class="input-group-addon">
              <DatePicker onChange={changeDate} value={date} />
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

const CreateItemWrapped = withRouter(withFirebase(CreateItemBase));

export { CreateItemWrapped };

export default CreateItem;

// export default class CreateItem extends Component {
//     render() {
//         return (
//             <div className="card card-body my-3 bg-secondary">
//                 <form onSubmit="addItem()">
//                     <div className="input-group">
//                         <div className="input-group-prepend d-inline">
//                             <div className="input-group-text bg-success">
//                                 <button type="submit" className="btn btn-sm"><i className="fa fa-plus-circle"></i></button>
//                             </div>
//                         </div>
//                         <input type="text" id="addItem" className="form-control form-control-lg" placeholder="What needs to be done?" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }
