import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔹 Firebase Config
const firebaseConfig = {
  "Get firebse config from firebase condiguration"
};

// 🔹 Ensure Firebase initializes only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 🔹 Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Export Firebase Services
export { auth, db };
