// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV0RCc_h_8YbjFW9iXGRFM7n2YXyj68SY",
  authDomain: "react-media-41360.firebaseapp.com",
  projectId: "react-media-41360",
  storageBucket: "react-media-41360.appspot.com",
  messagingSenderId: "304426247813",
  appId: "1:304426247813:web:a5c9fd340e259976b56bec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);