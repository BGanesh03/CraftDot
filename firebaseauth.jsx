import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCUwYQyazU22pquaTeaaEVzffYnA9Bi-Q4",
  authDomain: "zybite-50db9.firebaseapp.com",
  projectId: "zybite-50db9",
  storageBucket: "zybite-50db9.appspot.com",
  messagingSenderId: "520284261069",
  appId: "1:520284261069:web:f381c0f5a6f1bc93497784",
  measurementId: "G-5J93LKNBN7",
};

// 🔹 Ensure Firebase initializes only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 🔹 Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Export Firebase Services
export { auth, db };
