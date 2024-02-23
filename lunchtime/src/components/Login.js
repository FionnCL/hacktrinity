import React, { useState, useEffect } from "react";
import { auth, provider } from "./config.js"
import { signInWithPopup } from "firebase/auth";

import Home from "./Home.js";

export default function Login(){
    const [signedIn, setSignedIn] = useState('');
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setSignedIn(data.user.email);
            localStorage.setItem("email", data.user.email);
        });
    }

    useEffect(() => {
        setSignedIn(localStorage.getItem('email'));
    }, []);

    return(
        <div>
            { signedIn ? <Home/> : <button onClick={handleClick}>Sign in with Google</button> }
        </div>
    );
}