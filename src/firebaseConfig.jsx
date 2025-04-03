// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpDmXCUby_qX_U4a7SyLX6tUnW5kWQZ3s",
  authDomain: "gestion-projets-73d36.firebaseapp.com",
  projectId: "gestion-projets-73d36",
  storageBucket: "gestion-projets-73d36.firebasestorage.app",
  messagingSenderId: "512044961442",
  appId: "1:512044961442:web:da5d625488c48c7c5e91fb",
  measurementId: "G-17V5E63RC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };