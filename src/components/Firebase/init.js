// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN17e-rjE-4cL9Y01De2O_BRJIlCwxedQ",
  authDomain: "fit5120-9228a.firebaseapp.com",
  projectId: "fit5120-9228a",
  storageBucket: "fit5120-9228a.firebasestorage.app",
  messagingSenderId: "430669331189",
  appId: "1:430669331189:web:9ff00f75f9c34ba27e23bc"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
export { auth } 