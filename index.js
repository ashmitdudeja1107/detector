const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Detector Server API is running!" });
});

// Test endpoint
app.get("/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    message: "Server is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Handle all routes
app.all("*", (req, res) => {
  res.json({ 
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

module.exports = app;