import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../App.css";
import {
  makeStyles
} from "@material-ui/core/styles";
import { useState, useRef } from "react";
import { handleNew } from "./utils";
const useStyles = makeStyles({
  titleInput: {
    display: "block",
    marginBottom: "2rem",
  },
  bodyInput: {
    display: "block",
  },
});

export default function NoteInput() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const classes = useStyles();
const [disabled, setDisabled] = useState(true);
// const [submit, setSubmit] = useState(false)
  const handleChange = (e) => {
    e.preventDefault();
    handleNew(titleRef.current.value, bodyRef.current.value);
    titleRef.current.value = ''
    bodyRef.current.value = ''
    console.log(titleRef.current.value);
    console.log(bodyRef.current.value);
    // console.log(titleRef.current.value);
    // console.log(bodyRef.current.value);

  };
  
  const handleButton = ()=>{
    if(bodyRef.current.value === '' || titleRef.current.value ===''){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  }

    
  

  return (
    <>
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        placeholder="Enter your title here"
        inputRef={titleRef}
        multiline
        className={classes.titleInput}
        required
        onChange={()=>handleButton()}
      />
      <TextField
        id="standard-basic"
        label="Body"
        variant="standard"
        placeholder="Enter your body here"
        inputRef={bodyRef}
        className={classes.bodyInput}
        multiline
        rows={5}
        required
        onChange={()=>handleButton()}

      />
      <br /> <br />
      <Button variant="contained" onClick={handleChange} disabled={disabled}>
        Submit
      </Button>
    </>
  );
}
