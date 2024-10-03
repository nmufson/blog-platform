import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import "./styles/index.css";
import { MyContextProvider } from "./context/MyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </StrictMode>,
);
