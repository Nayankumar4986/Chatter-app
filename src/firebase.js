
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACe-Fm5wMvckD5QR1YFVjfT7ih86jltNU",
  authDomain: "chatter-app-230e7.firebaseapp.com",
  projectId: "chatter-app-230e7",
  storageBucket: "chatter-app-230e7.appspot.com",
  messagingSenderId: "758150783817",
  appId: "1:758150783817:web:5d47c368c97f4c9e75f098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

