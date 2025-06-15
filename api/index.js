const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));

app.use(express.json());

// Import routes (adjust path since we're in api/ folder)
const authRoutes = require("../routes/authRoutes");
const mailRoutes = require("../routes/mailRoutes");

// Test endpoint - no /api prefix
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

// Mount routes - no /api prefix
app.use("/auth", authRoutes);
app.use("/mail", mailRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Detector Server API is running!" });
});

module.exports = app;