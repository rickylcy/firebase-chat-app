import React from "react";
import { Button } from "@mui/joy";
import { doSignOut } from "../../firebase/auth";

export default function SignOut() {
  return (
    <Button
      variant="soft"
      onClick={() => {
        doSignOut().then(() => {
          console.log("User signed out!!");
        });
      }}
    >
      Sign Out
    </Button>
  );
}
