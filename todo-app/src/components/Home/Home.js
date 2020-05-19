import React from 'react';
import { Component } from "react";

const HomePage = () => (
    <div>
        <Home/>
    </div>
);

class Home extends Component {
    render() {
        return (
            <div>
                This is the homepage
            </div>
        )
    }
}

export default Home;
