import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Landing from './components/Landing.js'
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setSignedIn(true);
    } else {
      // User is signed out
      setSignedIn(false);
    }

});
  return (
    <div className="App">
      <Navbar/>
      { signedIn ? <Home/> : <Landing/> }
    </div>
  );
}

export default App;
