import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./config.js"

export default function Home(){
    const [signedIn, setSignedIn] = useState('');

    const handleClick = (() => {
        signOut(auth).then(() => {
            setSignedIn('');
            localStorage.setItem("email", '');
            console.log("Signed out successfully!")
        }).catch((error) => {
            console.log(error);
        });
    });

    useEffect(() => {
        setSignedIn(localStorage.getItem('email'));
    }, []);

    return (
        <div>
            <h1>HOME PAGE!</h1>
            <button onClick={handleClick}>Sign out</button>
        </div>
    );
}