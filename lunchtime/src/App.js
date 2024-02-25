import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Landing from './components/Landing.js'
import './App.css';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setUserID(uid);
      setSignedIn(true);
    } else {
      // User is signed out
      setSignedIn(false);
      setUserID(null);
    }
  });

  return (
    <div className="App">
        <Navbar/>
        { signedIn ? <Home/> : <Landing/> }
    </div>
  );
}

    // Load the Google API
//     window.gapi.load('client:auth2', () => {
//       window.gapi.client.init({
//         apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//         clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//         scope: 'https://www.googleapis.com/auth/calendar'
//       })
//       .then(() => {
//         // Handle successful initialization
//         // You can save the auth instance to state, but since this is a functional component,
//         // you should use useState and useEffect hooks for handling state and side effects.
//         const auth2 = window.gapi.auth2.getAuthInstance();
//         auth2.isSignedIn.listen((isSignedIn) => {
//           // Update state based on Google's auth state
//           setSignedIn(isSignedIn);
//         });
//         // Update state based on current auth state
//         setSignedIn(auth2.isSignedIn.get());
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     });
//   }, []); // The empty array ensures this effect runs once, similar to componentDidMount
// =======

  //   // Load the Google API
  //   window.gapi.load('client:auth2', () => {
  //     window.gapi.client.init({
  //       apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  //       clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  //       scope: 'https://www.googleapis.com/auth/calendar'
  //     })
  //     .then(() => {
  //       // Handle successful initialization
  //       // You can save the auth instance to state, but since this is a functional component,
  //       // you should use useState and useEffect hooks for handling state and side effects.
  //       const auth2 = window.gapi.auth2.getAuthInstance();
  //       auth2.isSignedIn.listen((isSignedIn) => {
  //         // Update state based on Google's auth state
  //         setSignedIn(isSignedIn);
  //       });
  //       // Update state based on current auth state
  //       setSignedIn(auth2.isSignedIn.get());
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   });
  // }, []); // The empty array ensures this effect runs once, similar to componentDidMount
// );
