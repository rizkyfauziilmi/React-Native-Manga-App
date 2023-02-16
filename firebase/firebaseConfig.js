import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: apiKey || process.env.apiKey,
  authDomain: authDomain || process.env.authDomain,
  projectId: projectId || process.env.projectId,
  storageBucket: storageBucket || process.env.storageBucket,
  messagingSenderId: messagingSenderId || process.env.messagingSenderId,
  appId: appId || process.env.appId,
  measurementId: measurementId || process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)