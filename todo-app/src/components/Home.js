import React from 'react';
import { Component } from "react";
import { Async } from "react-async";
import { Link } from "react-router-dom"
import "./Home.css"

async function getQuote() {
    let response = await fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            "x-rapidapi-key": "none"
        }
    });
    if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        return json;
    }
    throw new Error(response.status);
}

export default class Home extends Component {
    render() {
        return (
            <div>
                <Async promiseFn={getQuote}>
                    {
                        ({ data, error, loading }) => {
                            if (loading)
                                return <p>Loading</p>;
                            if (error)
                                return <p>Error Message: ${error.message}</p>
                            if (data) {
                                console.log(data);
                                return (
                                    <body className="bg-dark">
                                        <blockquote class="blockquote">
                                            <p className="display-4 text-light pt-4">{data.content}</p>
                                            <footer className="blockquote-footer text-light pl-4">{data.originator.name}</footer>
                                        </blockquote>

                                        <div className="text-center mt-4">
                                            <Link to="/notes">
                                            <button className="btn btn-primary">Go To Notes</button>
                                            </Link>
                                        </div>
                                    </body>
                                )
                            }
                        }
                    }
                </Async>
            </div>
        )
    }
}