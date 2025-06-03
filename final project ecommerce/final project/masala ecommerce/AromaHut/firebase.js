// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnu5REbNnCJtXkkGBmUT4GuzWRf4KkqgY",
  authDomain: "aromahut-ddabf.firebaseapp.com",
  projectId: "aromahut-ddabf",
  storageBucket: "aromahut-ddabf.firebasestorage.app",
  messagingSenderId: "75569217040",
  appId: "1:75569217040:web:9ab1db3f91109a8cd5d495"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set };