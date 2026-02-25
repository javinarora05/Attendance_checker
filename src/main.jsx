import { createRoot } from "react-dom/client";
import React from "react";

import App from "./App.jsx";
import "./index.css";

// Apply dark theme globally by default
try {
  document.documentElement.classList.add("dark");
} catch {
  console.log("error")
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
