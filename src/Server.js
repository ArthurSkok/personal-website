const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const chalk = require("chalk"); // makes the logs look better

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors()); // Allow cross-origin requests, had to include because otherwise the server kept producing "needs upgrade" errors

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Utility function for logging messages with timestamps
const logWithTimestamp = (message, type = "info") => {
  const timestamp = new Date().toISOString();
  const logTypes = {
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
  };
  console.log(logTypes[type](`[${timestamp}] ${message}`));
};

// Handle WebSocket connections
io.on("connection", (socket) => {
  logWithTimestamp("New client connected", "info");

  // Handle incoming messages and broadcast them
  socket.on("message", (message) => {
    logWithTimestamp(`📩 Message received: ${message}`, "info");
    socket.broadcast.emit("message", message);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    logWithTimestamp("Client disconnected", "warn");
  });

  // Handle errors more gracefully
  socket.on("error", (error) => {
    logWithTimestamp(`⚠️ WebSocket error: ${error.message || error}`, "error");
  });
});

// Start the server
server.listen(PORT, () => {
  logWithTimestamp(
    `WebSocket server running on ws://localhost:${PORT}`,
    "info"
  );
});
