
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - using the demo project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBGOVbCqkiA55Kl2YSHpnV7U8jPQ9WMmLw",
  authDomain: "lovable-portfolio-demo.firebaseapp.com",
  projectId: "lovable-portfolio-demo",
  storageBucket: "lovable-portfolio-demo.appspot.com",
  messagingSenderId: "339618312966",
  appId: "1:339618312966:web:cc4fe5afefe31a2df56c48"
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
