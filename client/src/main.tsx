import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DarkModeProvider from "./contexts/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
