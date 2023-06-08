import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);
