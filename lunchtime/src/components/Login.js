import React, { useState, useEffect } from "react";
import { auth, provider } from "./config.js"
import { signInWithPopup, signOut } from "firebase/auth";

import './Login.css'

export default function Login(){
    const [signedIn, setSignedIn] = useState('');

    const handleLogin = () => {
        signInWithPopup(auth, provider).then((data) => {
            setSignedIn(data.user.email);
            localStorage.setItem("email", data.user.email);
        });
    }

    const handleLogout = (() => {
        signOut(auth).then(() => {
            localStorage.setItem("email", '');
            setSignedIn('');
            console.log("Signed out successfully!")
        }).catch((error) => {
            console.log(error);
        });
    });

    useEffect(() => {
        setSignedIn(localStorage.getItem('email'));
    }, []);

    return(
        <div>
            { signedIn ? <button className="login-with-google" onClick={handleLogout}>Sign out</button> : <button className="login-with-google" onClick={handleLogin}>Sign in with Google</button> }
        </div>
    );
}