import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("http://localhost:5000/api/home");
      const data = await response.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Author Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
