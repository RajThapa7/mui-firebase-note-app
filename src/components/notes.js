import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { OpenInFull } from "@mui/icons-material";
import Note from "./note";
import { handleDelete } from "./utils";
import DeleteIcon from '@material-ui/icons/Delete';
export default function Notes() {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [openFull, setOpenFull] = useState(false);
  const auth = getAuth(app);
  useEffect(() => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, orderBy("timestamp", "asc")); // for timestamp ordering
    const unsub = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);
const OpenInFull = (id)=>{
  setOpenFull(true);
}
 const getItemWithId = async (id) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("id", "==", id));
  // onSnapshot(q, (snapshot) => {
  //     setSingleData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }); 
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc=>({...doc.data(), id:doc.id})); 
      console.log(results)
console.log(snapshot);
      console.log(id)
      console.log("getWithId");
};
  return (
    <>
      <Grid container spacing={2}>
        {data.map((item) => {
          const { titleRef, bodyRef, id } = item;
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3} onClick={()=>getItemWithId(id)}>
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <h2>{titleRef}</h2>
                <h3>{bodyRef.substr(0, 100)}</h3>
<DeleteIcon onClick={(e)=>{
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  handleDelete(id)}} style={{zIndex:'100'}}/>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
