import React from "react";

import Login from './Login.js'
import './Navbar.css'

export default function Navbar(){
    return(
        <div className="navbar">
            <h1 className="navbar-logo">lunchtime.</h1>
            <Login/>
        </div>
    );
}