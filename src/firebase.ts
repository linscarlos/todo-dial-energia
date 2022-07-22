
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBvQpcfnYWHgS1Mz3iu0Ly75yMN7RVgfuQ",
  authDomain: "to-do-dial-energia.firebaseapp.com",
  projectId: "to-do-dial-energia",
  storageBucket: "to-do-dial-energia.appspot.com",
  messagingSenderId: "734490312992",
  appId: "1:734490312992:web:8f8e58f6003a63c70b9745",
  measurementId: "G-5JYZLVLD61"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);