
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
// Replace these values with your own Firebase project credentials or use environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBGOVbCqkiA55Kl2YSHpnV7U8jPQ9WMmLw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lovable-portfolio-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lovable-portfolio-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lovable-portfolio-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "339618312966", 
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:339618312966:web:cc4fe5afefe31a2df56c48"
};

// To prevent the "Firebase App named '[DEFAULT]' already exists" error
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If the app is already initialized, use the existing one
  app = initializeApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Configure Google Auth Provider for better user experience
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
