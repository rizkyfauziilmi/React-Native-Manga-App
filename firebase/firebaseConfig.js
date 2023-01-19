import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey||"AIzaSyAb6Umkkb6M-nPKZ7QY5kdCrUUZSmQXJvc",
  authDomain: process.env.authDomain||"jozu-81b35.firebaseapp.com",
  projectId: process.env.projectId||"jozu-81b35",
  messagingSenderId: process.env.messagingSenderId||"348212962396",
  appId: process.env.appId||"1:348212962396:web:f39a8aa0693fe37f633299",
  measurementId: process.env.measurementId||"G-D11JB605C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)