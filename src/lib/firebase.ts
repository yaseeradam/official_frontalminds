import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-510861475-c14e3",
  "appId": "1:325665600868:web:bb3ab548eece2ca7d4b671",
  "apiKey": "AIzaSyATc7aK3Hd7pbUytETnHM_LgbBa5AJIIrs",
  "authDomain": "studio-510861475-c14e3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "325665600868"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
