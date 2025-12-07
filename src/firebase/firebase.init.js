// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjHJDQ9QOPWYUCW4Dl2hWhVcC5DodHIK0",
  authDomain: "assignment-10-22a68.firebaseapp.com",
  projectId: "assignment-10-22a68",
  storageBucket: "assignment-10-22a68.firebasestorage.app",
  messagingSenderId: "988443332300",
  appId: "1:988443332300:web:0077c0c0be746861d2bc69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

