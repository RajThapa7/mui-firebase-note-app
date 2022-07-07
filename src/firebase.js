// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoZwn0iksbOb5t64WOZCm2iQLsu_oL-lE",
  authDomain: "note-app-b04c1.firebaseapp.com",
  projectId: "note-app-b04c1",
  storageBucket: "note-app-b04c1.appspot.com",
  messagingSenderId: "24460815028",
  appId: "1:24460815028:web:933f1798942ee01ed805e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default getFirestore();
