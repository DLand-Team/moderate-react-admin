import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

import "./index.css";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <App></App>
  </BrowserRouter>
);
