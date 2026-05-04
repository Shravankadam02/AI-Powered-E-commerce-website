
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "loginsnapcart.firebaseapp.com",
  projectId: "loginsnapcart",
  storageBucket: "loginsnapcart.firebasestorage.app",
  messagingSenderId: "38677577595",
  appId: "1:38677577595:web:8d7b00029fca2f7e4f87de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };