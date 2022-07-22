
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyC1cfxjOlyMVqcGcjzH7OFJU9z_xJui8X4",

  authDomain: "energia-dial-2.firebaseapp.com",

  projectId: "energia-dial-2",

  storageBucket: "energia-dial-2.appspot.com",

  messagingSenderId: "933120890090",

  appId: "1:933120890090:web:cac130e8a706ee6ec87393"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);