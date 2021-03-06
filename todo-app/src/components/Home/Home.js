import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

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

  // npm start will throw a warning about how there is a missing dependency
  // and it should be included or the dependency array should be removed. This
  // seems to be a false warning that is being raised. If data is included as a dependency
  // more than one quote will be fetched from the API and likewise if the dependency
  // array is removed. 
  useEffect(() => {
    getQuote();
    console.log("this is data", data);
  }, []);

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
      <div className="text-center" style={{ margin: "12.5%" }}>
        <ScaleLoader loading={isLoading} height={100} width={20} color={"#007bff"} />
      </div>
    );
  }
};

export default Home;
