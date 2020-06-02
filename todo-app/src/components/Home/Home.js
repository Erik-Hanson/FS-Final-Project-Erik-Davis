import React, { useState, useEffect } from "react";
import { Async } from "react-async";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Home = ({ authUser }) => {
  const [isLoading, setLoad] = useState(true);
  const [data, setData] = useState();

  async function getQuote() {
    let response = await fetch(
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
          "x-rapidapi-key":
            "05a9e3db6dmshfd21663b037bf61p15838djsnafe1ac4f6bb3",
        },
      }
    );
    if (response.status === 200) {
      let json = await response.json();
      console.log(json);
      setData(json);
      setLoad(false);
      return json;
    }
    throw new Error(response.status);
  }

  useEffect(() => {
    getQuote();
    console.log("this is data", data);
  }, []);

  // return (
  //   <div className="text-center">
  //     {isLoading && <Spinner animation="border" variant="light" />}
  //   </div>
  // );

  if (data) {
    return (
      <div className="bg-dark">
        <blockquote className="blockquote">
          <p className="display-4 text-light pt-4 pl-2">{data.content}</p>
          <footer className="blockquote-footer text-light pl-4">
            {data.originator.name}
          </footer>
        </blockquote>
        <div className="text-center mt-4">
          {authUser ? (
            <Link to="/notes">
              <button className="btn btn-primary">Go To Notes</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="btn btn-primary">Go To Sign In</button>
            </Link>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center">
        {isLoading && <Spinner animation="border" variant="light" />}
      </div>
    );
  }

  // <Async promiseFn={getQuote}>
  //   {({ data, error, loading }) => {
  //     //if (loading) return <p>loading</p>;
  //     if (loading) setLoad(true);
  //     if (error) return <p>Error Message: ${error.message}</p>;
  //     if (data) {
  //       return (
  //         <div className="bg-dark">
  //           <blockquote className="blockquote">
  //             <p className="display-4 text-light pt-4 pl-2">{data.content}</p>
  //             <footer className="blockquote-footer text-light pl-4">
  //               {data.originator.name}
  //             </footer>
  //           </blockquote>

  //           <div className="text-center mt-4">
  //             {authUser ? (
  //               <Link to="/notes">
  //                 <button className="btn btn-primary">Go To Notes</button>
  //               </Link>
  //             ) : (
  //               <Link to="/signin">
  //                 <button className="btn btn-primary">Go To Sign In</button>
  //               </Link>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     }
  //   }}
  // </Async>;
};

export default Home;
