import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUwYQyazU22pquaTeaaEVzffYnA9Bi-Q4",
  authDomain: "zybite-50db9.firebaseapp.com",
  projectId: "zybite-50db9",
  storageBucket: "zybite-50db9.appspot.com", // ✅ Corrected
  messagingSenderId: "520284261069",
  appId: "1:520284261069:web:f381c0f5a6f1bc93497784",
  measurementId: "G-5J93LKNBN7"
};

// Initialize Firebase only if it's not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get Firebase Auth instance
const auth = getAuth(app);

export { auth }; // ✅ Use named export instead of default
