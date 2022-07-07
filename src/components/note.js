import React from "react";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
// export const getItemWithId = async (id) => {
//     const collectionRef = collection(db, "users");
//     const q = query(collectionRef, where("id", "==", id));
//     onSnapshot(q, (snapshot) => {
//         const results = (snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       });    console.log(results)
//   };
export default function Note({ id }) {
 
  return <>
  
  </>;
}
