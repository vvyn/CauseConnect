import React, { useState, useEffect } from "react";

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
      <p>{message}</p>
    </div>
  );
}
