import { collection, addDoc, doc, deleteDoc, serverTimestamp  } from "firebase/firestore"; 
import db from '../firebase'
import {app} from '../firebase'
import { getAuth } from "firebase/auth";
import React from 'react'
const auth = getAuth(app);
// const[user, setUser] = React.useState(false);
// onAuthStateChanged(auth, (user)=>{
//   if(user){
//   setUser(true);
//   }
// })
export const handleNew= async (titleRef, bodyRef)=>{
  const collectionRef = collection(db, 'users');
  // if(user){
  // const payload = {titleRef,bodyRef, uid: user.uid, timestamp: serverTimestamp()}
  // }
  // else{
  //   const payload = {titleRef,bodyRef,timestamp: serverTimestamp()}

  // }
  const payload = {titleRef,bodyRef,timestamp: serverTimestamp()}

    const docRef = await addDoc(collectionRef, payload);
    console.log(docRef.id)
  }

  export const handleDelete = async (id)=>{
    const docRef = doc(db, 'users', id );
  await deleteDoc(docRef)
  }
