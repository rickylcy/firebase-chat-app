import React, { useRef, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Import Joy UI components
import { Box, Button, Input, Typography, Avatar, Stack, Card } from "@mui/joy";

// Import the ColorSchemeToggle component
import ColorSchemeToggle from "./ColorSchemeToggle";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASKFf_R8_472SfS0eZ8_eIPhH2ZZUfPUQ",
  authDomain: "chat-app-6843c.firebaseapp.com",
  projectId: "chat-app-6843c",
  storageBucket: "chat-app-6843c.appspot.com",
  messagingSenderId: "554917524494",
  appId: "1:554917524494:web:5e5ab830991f6fc4bfb85f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <Box className="App" sx={{ padding: 2, height: "100vh" }}>
      <Navbar user={user} />
      <Box>{user ? <ChatRoom /> : <SignIn />}</Box>
    </Box>
  );
}

function Navbar({ user }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "background.surface",
        borderRadius: 1,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: 2,
      }}
    >
      <Typography level="h4" sx={{ fontSize: 24 }}>
        Chat Room
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <ColorSchemeToggle />
        {user && <SignOut />}
      </Stack>
    </Box>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 400, textAlign: "center", padding: 3, margin: "auto" }}
    >
      <Typography level="h5" sx={{ marginBottom: 2 }}>
        Sign in to Chat
      </Typography>
      <Button
        variant="solid"
        onClick={signInWithGoogle}
        sx={{ marginBottom: 2 }}
      >
        Sign in with Google
      </Button>
      <Typography level="body2" sx={{ color: "text.secondary" }}>
        Please follow the community guidelines while chatting.
      </Typography>
    </Card>
  );
}

function SignOut() {
  return (
    <Button variant="soft" onClick={() => signOut(auth)}>
      Sign Out
    </Button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#f4f4f9",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </Box>

      <Box sx={{ height: "10vh" }}>
        <form onSubmit={sendMessage} style={{ marginTop: "16px" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type your message..."
              sx={{ flexGrow: 1, backgroundColor: "#fff", borderRadius: "8px" }}
            />
            <Button
              type="submit"
              variant="solid"
              disabled={!formValue}
              sx={{ height: "40px" }}
            >
              🕊️ Send
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <Stack
      direction={messageClass === "sent" ? "row-reverse" : "row"}
      spacing={2}
      sx={{
        marginBottom: 2,
        alignItems: "center",
      }}
    >
      <Avatar
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
        sx={{ width: 40, height: 40 }}
      />
      <Typography
        sx={{
          backgroundColor: messageClass === "sent" ? "#1976d2" : "#e0e0e0",
          color: messageClass === "sent" ? "#fff" : "#000",
          padding: 1.5,
          borderRadius: "8px",
          maxWidth: "75%",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

export default App;
