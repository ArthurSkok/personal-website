import "./Popup.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Popup = ({ show, onClose, input }) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    newSocket.on("error", (error) => {
      console.error(`Error: ${error}`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket) {
      console.log("Sending message:", message);
      socket.emit("message", message);
      setMessage("");
    } else {
      console.error("Socket is not connected");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="Popup">
      <span className="Close" onClick={onClose}>
        &times;
      </span>
      <p>{input}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Popup;
