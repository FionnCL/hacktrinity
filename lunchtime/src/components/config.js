import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9NvCM6xx4Sf3Dc39PXHjKPYFtGiGsuXI",
  authDomain: "lunctime-2-electric-boogaloo.firebaseapp.com",
  projectId: "lunctime-2-electric-boogaloo",
  storageBucket: "lunctime-2-electric-boogaloo.appspot.com",
  messagingSenderId: "139845761267",
  appId: "1:139845761267:web:7c12ced53cf50a9bb41f86"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };
