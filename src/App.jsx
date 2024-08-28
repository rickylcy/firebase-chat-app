import React from "react";
import "./App.css";
import { Box } from "@mui/joy";

// Importing necessary components
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

// Firebase and Auth State
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Box className="App" sx={{ padding: 2, height: "100vh" }}>
      <Navbar user={user} />
      <Box>{user ? <ChatRoom /> : <SignIn />}</Box>
    </Box>
  );
}

export default App;
