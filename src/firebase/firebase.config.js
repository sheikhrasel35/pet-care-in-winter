// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDMFOB8p7P88rewD7gf9iqgdRx0kJVV8yM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dragon-news-breaking.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dragon-news-breaking",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dragon-news-breaking.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "598265501084",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:598265501084:web:d3a276b92ae529eeab6459",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
