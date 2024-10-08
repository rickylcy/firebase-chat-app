import React, { useRef, useState } from "react";
import { Avatar, Box, Button, Input, Stack, Typography } from "@mui/joy";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { useColorScheme } from "@mui/joy/styles";

export default function ChatRoom() {
  const { mode } = useColorScheme(); // Get current color scheme mode (light/dark)
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
          backgroundColor: mode === "dark" ? "#2c2c2c" : "#f4f4f9", // Adjust background color based on mode
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
              sx={{
                flexGrow: 1,
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                borderRadius: "8px",
              }}
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

// ChatMessage component inside ChatRoom
function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const { mode } = useColorScheme(); // Get current color scheme mode (light/dark)

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
          backgroundColor:
            messageClass === "sent"
              ? mode === "dark"
                ? "#0057d9"
                : "#1976d2"
              : mode === "dark"
              ? "#424242"
              : "#e0e0e0",
          color:
            messageClass === "sent"
              ? "#fff"
              : mode === "dark"
              ? "#fff"
              : "#000",
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
