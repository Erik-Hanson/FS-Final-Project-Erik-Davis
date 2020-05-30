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
import Search from "../components/Search";

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
      <Search notes={notes} />
      <CreateItem setUpdate={setUpdate} firebase={props.firebase} />
      {notes.length !== 0 &&
        <Item allNotes={notes} setUpdate={setUpdate} firebase={props.firebase} />
      }
    </div>
  );
};

const ItemListWrapped = withRouter(withFirebase(ItemListBase));

export { ItemListWrapped };

export default ItemList;
