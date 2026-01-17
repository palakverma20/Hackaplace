import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS5LZEiseL4YLbQ1WG1KG_6K7GazBm40g",
  authDomain: "hackaplace.firebaseapp.com",
  projectId: "hackaplace",
  storageBucket: "hackaplace.firebasestorage.app",
  messagingSenderId: "565441376659",
  appId: "1:565441376659:web:bac322de13849585faf866",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;