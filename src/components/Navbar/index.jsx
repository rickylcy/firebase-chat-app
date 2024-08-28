import React from "react";
import { Box, Stack, Typography } from "@mui/joy";
import ColorSchemeToggle from "../../ColorSchemeToggle";
import SignOut from "../Signout";

export default function Navbar({ user }) {
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
