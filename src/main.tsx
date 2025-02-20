import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SubjectProvider } from "./context/SubjectContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SubjectProvider>
      <App />
    </SubjectProvider>
  </StrictMode>
);
