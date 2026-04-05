import i18n from "./i18n.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const lang = localStorage.getItem("i18nextLng") || "en";
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = lang;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);