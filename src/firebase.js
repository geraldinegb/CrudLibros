// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0jA9mEG9mXQ1cIoyveE6KV5Z_iGEdPHA",
  authDomain: "crudlibros-7f99b.firebaseapp.com",
  projectId: "crudlibros-7f99b",
  storageBucket: "crudlibros-7f99b.appspot.com",
  messagingSenderId: "1077830494047",
  appId: "1:1077830494047:web:2a06d6e7a17c01fbf678ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
