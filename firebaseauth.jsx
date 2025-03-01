import { getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Add AsyncStorage

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUwYQyazU22pquaTeaaEVzffYnA9Bi-Q4",
  authDomain: "zybite-50db9.firebaseapp.com",
  projectId: "zybite-50db9",
  storageBucket: "zybite-50db9.appspot.com",
  messagingSenderId: "520284261069",
  appId: "1:520284261069:web:f381c0f5a6f1bc93497784",
  measurementId: "G-5J93LKNBN7",
};

// ✅ Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Firestore
const db = getFirestore(app);

export { auth, db };
