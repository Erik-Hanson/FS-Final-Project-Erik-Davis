/*
This class is the component which contains the form to create an to do item.
It's called within App.js.
*/

import React, { useState } from "react";
import "./CreateItem.css";
import DatePicker from "react-date-picker";

const CreateItem = (props) => {
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

  const submitNote = (event) => {
    event.preventDefault();

    if (noteTitle !== "" || noteText !== "" || category !== "") {
      props.firebase.addNote(noteTitle, noteText, category, date);
      props.setUpdate(true);
      document.getElementById("Title").value = "";
      document.getElementById("Category").value = "";
      document.getElementById("Text").value = "";
    }
  };

  return (
    <div className="card my-3 bg-secondary text-light">
      <div className="card-header text-center h2">Create a Note</div>
      <div className="card-body">
        <form>
          <div className="input-group mb-2">
            <input
              type="text"
              id="Title"
              name="itemText"
              className="form-control form-control-lg"
              placeholder="Title"
              onChange={(e) => changeTitle(e.currentTarget.value)}
            />
          </div>

          <div className="input-group mb-2">
            <input
              type="text"
              id="Text"
              name="itemText"
              className="form-control form-control-lg"
              placeholder="Description"
              onChange={(x) => changeText(x.currentTarget.value)}
            />
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              id="Category"
              name="itemText"
              className="form-control form-control-lg"
              placeholder="Category"
              onChange={(x) => changeCategory(x.currentTarget.value)}
            />
          </div>
          <div className="text-center">
            <span className="bg-light border-0">
              <DatePicker onChange={changeDate} value={date} />
              <span className="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
          <button
            onClick={(e) => submitNote(e)}
            type="submit"
            className="btn btn-success btn-block mt-2"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
