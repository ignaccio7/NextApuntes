// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-gMVY5p7lE1uNQc7Jr0YrcUh-81ayOgA",
  authDomain: "nextjs-firebase-c70e5.firebaseapp.com",
  projectId: "nextjs-firebase-c70e5",
  storageBucket: "nextjs-firebase-c70e5.firebasestorage.app",
  messagingSenderId: "582276289455",
  appId: "1:582276289455:web:e26e995eeb54273f65955a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

// Auth functions
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}