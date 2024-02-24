import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9KMYCskvaYrdNUY1p23oIEROn20as2bk",
  authDomain: "lunchtime-38432.firebaseapp.com",
  projectId: "lunchtime-38432",
  storageBucket: "lunchtime-38432.appspot.com",
  messagingSenderId: "281316968978",
  appId: "1:281316968978:web:3b81138dbafd926778e6cb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };