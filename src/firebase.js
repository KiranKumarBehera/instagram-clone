import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkwUmg8PMX5wGkL06K9Qgp79sXwvfw4kE",
  authDomain: "instagram-clone-react-d7465.firebaseapp.com",
  projectId: "instagram-clone-react-d7465",
  storageBucket: "instagram-clone-react-d7465.appspot.com",
  messagingSenderId: "639239883318",
  appId: "1:639239883318:web:008433eca59f4c6db12697",
  measurementId: "G-9V945EK6MB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
