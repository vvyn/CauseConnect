import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
