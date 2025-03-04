
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase Configuration
 * 
 * To set up Firebase:
 * 1. Create a Firebase project: https://console.firebase.google.com/
 * 2. Register your app and get config values
 * 3. Create a .env.local file with the following variables:
 *    - VITE_FIREBASE_API_KEY
 *    - VITE_FIREBASE_AUTH_DOMAIN
 *    - VITE_FIREBASE_PROJECT_ID
 *    - VITE_FIREBASE_STORAGE_BUCKET
 *    - VITE_FIREBASE_MESSAGING_SENDER_ID
 *    - VITE_FIREBASE_APP_ID
 * 4. Enable Firebase Authentication with Google provider
 * 5. Enable Firestore Database
 * 6. Enable Storage and set up security rules
 */

// Use mock configuration if environment variables are not available
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
