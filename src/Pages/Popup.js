import React from "react";
import "./Popup.css";

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const Popup = ({ show, onClose, input }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="Popup">
      <span className="Close" onClick={onClose}>
        &times;
      </span>
      <p>{input}</p>
    </div>
  );
};

export default Popup;
