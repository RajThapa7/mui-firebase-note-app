import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@material-ui/core/Drawer";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@material-ui/core/Button";
import AccountMenu from "./accountMenu.js";
import { FcGoogle } from "react-icons/fc";
import { Badge } from "@mui/material";
import { CgNotes } from "react-icons/cg";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import NoteInput from "./noteInput";
import "../App.css";
import { app } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import Notes from "./notes";
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
import { useState, useEffect } from "react";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidedrawer() {
  const auth = getAuth(app);
  const [loading, setLoading] = React.useState(false);
  //sign in with gooogle
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log(loading);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
      });
      setLoading(false);
      console.log(loading);
    } catch {
      console.log("error: sign in pop-up cancelled");
      setLoading(false);
    }
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, orderBy("timestamp", "asc")); // for timestamp ordering
    const unsub = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //states
  const [LoggedIn, setLoggedIn] = React.useState(false);
  const [newNotes, setNewNotes] = React.useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Notes App
          </Typography>
          {!LoggedIn ? (
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => signInWithGoogle()}
              style={{
                backgroundColor: "#eda42d",
                position: "absolute",
                right: "2rem",
              }}
              className="sign-btn"
            >
              <FcGoogle style={{ fontSize: "24px" }} />
              &nbsp;<span className="sign-text">Sign Using Google</span>
            </Button>
          ) : (
            <AccountMenu />
          )}
          {/* { !LoggedIn?<button  disabled={loading} onClick={()=>signInWithGoogle()} style={{backgroundColor: '#eda42d', position:'absolute', right:'2rem' }} className="sign-btn"><FcGoogle style={{fontSize:'24px',}}/>&nbsp;<span className='sign-text'>Sign Using Google</span></button>
         : <AccountMenu/>} */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List onClick={() => setNewNotes(false)}>
          {["All Notes"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? (
                  <Badge badgeContent={data.length} color="primary">
                    <CgNotes style={{ fontSize: "1.5rem" }} color="action" />
                  </Badge>
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {["Share"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? (
                  <BsFillShareFill style={{ fontSize: "1.5rem" }} />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* //insert here */}
        {newNotes || <Notes />}
        {newNotes && <NoteInput />}{" "}
        <AiFillPlusCircle
          style={{ fontSize: "3rem", color: "#3F51B5" }}
          onClick={(e) => {
            e.preventDefault();
            setNewNotes(true);
          }}
          className="icon"
        />
      </Box>
    </Box>
  );
}
