/*
This class is the component which will contain the list of to do items.
This component is called within App.js.
The class also contains a call to the Item component as it is composed of the
item components.
*/

import React, { useEffect, useState, useCallback } from "react";
import Item from "./Item";
import CreateItem from "./CreateItem";
import { withRouter } from "react-router-dom";
import { withFirebase } from "./Firebase";

const ItemList = () => {
  return <ItemListWrapped />;
};

const ItemListBase = (props) => {
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetch = useCallback(async () => {
    const uid = await props.firebase.auth.currentUser.uid;
    await props.firebase.fetchAllNotes(uid, setNotes);
  }, [props.firebase]);

  useEffect(() => {
    fetch();
    setUpdate(false);
  }, [fetch, update]);

  return (
    <div>
      <CreateItem setUpdate={setUpdate} firebase={props.firebase} />
      <ul className="list-group my 3">
        <h2 className="text-center text-light">Your List</h2>
        <div className="card card-body bg-secondary">
          <Item
            allNotes={notes}
            setUpdate={setUpdate}
            firebase={props.firebase}
          />
          <button
            type="button"
            className="btn btn-danger btn-block mt-4"
            onClick={() => props.firebase.deleteAllNotes(notes, setUpdate)}
          >
            Clear Your List
          </button>
        </div>
      </ul>
    </div>
  );
};

const ItemListWrapped = withRouter(withFirebase(ItemListBase));

export { ItemListWrapped };

export default ItemList;
