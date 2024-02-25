import React from "react";
import sandwhich from './img/sandwhich.png';

import Login from './Login.js'
import './Navbar.css'

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="logo-img">
                <div className="sandwhich">
                    <img src={sandwhich} alt="sandwhich" className="sandwhich"/>
                </div>
                <h1 className="navbar-logo">lunchtime.</h1>
            </div>
            <div classname='navbar-login'>
                <Login className="navbar-login"/>
            </div>
        </div>
    );
}
