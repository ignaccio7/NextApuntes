// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

const db = getFirestore(app)

// Auth functions <===============================

// Login Function
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

// Create User Function
export const createUser = async (user: { email: string, password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password)
}

// Update User Function -> Update username and photo
export const updateUser = async (user:{ displayName?: string | null; photoURL?: string | null; }) => {
  if (auth.currentUser) return await updateProfile(auth.currentUser, user)
}

// Logout function
export const signOut = async () => {
  localStorage.removeItem("user")
  return auth.signOut()
}

// Send reset email function
export const sendResetEmail = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
}

// Database Functions <===============================

// Set a document in a collection
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp()
  return setDoc(doc(db, path), data)
}

// Get a document from a collection
export const getDocument = async (path: string) => {
  const document = await getDoc(doc(db, path))
  return document.data()
}