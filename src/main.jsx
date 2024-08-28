import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>
);
