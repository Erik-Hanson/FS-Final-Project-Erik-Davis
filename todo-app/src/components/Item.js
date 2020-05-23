/*
This class contains the layout for an object. As of right now the values
are hardcoded but should eventually be switched to populate the items
using data from a database. This component is called within the ItemList
component.
*/

import React from "react";

// const INITIAL_STATE = {
//   notes: "",
// };

const Item = (props) => {
  //console.log(props.allNotes, "all notes in item.js");
  props.allNotes.forEach((element) => {
    console.log(element);
  });
  return props.allNotes.map((note) => {
    console.log(note, "this is one note");
    return (
      <li className="text-center list-group-item text-capitalize">
        <div className="border border-secondary my-2">
          <p>{note.Title}</p>
        </div>
      </li>
    );
  });
};

export default Item;

// export default class Item extends Component {
//   //   constructor(props) {
//   //     super(props);
//   //     //this.state = { ...INITIAL_STATE };
//   //   }

//   //   componentDidMount() {
//   //     this.state = { ...this.props.value};
//   //   }

//   componentDidUpdate(prevProps) {}

//   render() {
//     return this.props.allNotes.map((note) => {
//       return (
//         <li className="text-center list-group-item text-capitalize">
//           <div className="border border-secondary my-2">
//             <p>{note.Title}</p>
//           </div>
//         </li>
//       );
//     });

//     // return (
//     //   <li className="text-center list-group-item text-capitalize">
//     //     <div className="border border-secondary my-2">
//     //       <h5>History Homework</h5>
//     //       <div>
//     //         <span id="edit" className="text-success mr-2">
//     //           <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//     //         </span>
//     //         <span id="delete" className="text-danger">
//     //           <i class="fa fa-trash"></i>
//     //         </span>
//     //       </div>
//     //     </div>
//     //     <div className="border border-secondary my-2">
//     //       <h5>Programming</h5>
//     //       <div>
//     //         <span id="edit" className="text-success mr-2">
//     //           <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//     //         </span>
//     //         <span id="delete" className="text-danger">
//     //           <i class="fa fa-trash"></i>
//     //         </span>
//     //       </div>
//     //     </div>
//     //   </li>
//     // );
//   }
// }
