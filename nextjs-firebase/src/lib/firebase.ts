// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadString, getDownloadURL, ref } from "firebase/storage";

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
// Para la autenticacion
export const auth = getAuth(app)
// Para la base de datos
export const db = getFirestore(app)
// Para subir imagenes
export const storage = getStorage(app)

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

// Update a document from a collection
export const updateDocument = async (path: string, data: any) => {
  return updateDoc(doc(db, path), data)
}

// Add a document in a collection || Esto es diferente al set ya que este crea el uid al momento de crear el documento
export const addDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp()
  return addDoc(collection(db, path), data)
}

// Delete a document from a collection
export const deleteDocument = async (path: string) => {
  return deleteDoc(doc(db, path))
}

// Storage Functions <===============================

//Upload image to storage - Sube una imagen en base 64 y obtiene la url
/**
 * path seria la ruta donde se guardara la imagen y base64 el formato en el cual subiremos la imagen
 * uploadString nos permite subir una imagen en formato base64
 * getDownloadURL nos permite obtener la url de la imagen subida
 * ref nos permite obtener la referencia a la imagen subida
 */
export const uploadImage = async (path: string, base64: string | any) => {
  return uploadString(ref(storage, path), base64, 'data_url')
    .then(() => {
      return getDownloadURL(ref(storage, path))
    })
}

// Save a file to user document with updateDocument

// Para obtener los productos de un determinado usuario
// nombre de la coleccion de la que obtendremos los documentos
// query para filtrar los documentos
export const getCollection = async (collectionName: string, queryArray?: any) => {
  const ref = collection(db, collectionName)
  const q = queryArray ? query(ref, ...queryArray) : query(ref)
  return (await getDocs((q))).docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

/**
 * Y para utilizarala en nuestros componentes de ls siguiente manera
 */
// const getItems = async () => {
//   const path = `users/${user.id}/products`
//   try {
//     const res = await getCollection(path)
//     console.log(res)    
//   } catch (error) {
//     ...
//   }
// }