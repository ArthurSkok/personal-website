const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});

server.listen(3001, () => {
  console.log("WebSocket server is running on ws://localhost:3001");
});
