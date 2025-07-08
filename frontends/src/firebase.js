// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // optional if you're uploading images/files

const firebaseConfig = {
  apiKey: "AIzaSyC6_RO8rMe5WPpkISjdTf0DCmVz6vAdsGc",
  authDomain: "web-store-e27d1.firebaseapp.com",
  projectId: "web-store-e27d1",
  storageBucket: "web-store-e27d1.firebasestorage.app",
  messagingSenderId: "789653146896",
  appId: "1:789653146896:web:aa6483bff7ce1fcc886995",
  measurementId: "G-SGPSXSE95V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // optional
