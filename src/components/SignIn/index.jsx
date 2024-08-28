import React from "react";
import { Button, Card, Typography } from "@mui/joy";
import { signInWithGoogle } from "../../firebase/auth";

export default function SignIn() {
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
