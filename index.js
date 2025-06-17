const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://detectordemo.vercel.app","https://localhost:5000"], // Only your frontend domain
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false, // Only set to true if you're using cookies
};

app.use(cors(corsOptions));

app.use(express.json());

// Test endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "Server is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler for unmatched routes - Must be AFTER all route definitions
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ 
      message: "API endpoint not found",
      endpoint: req.originalUrl
    });
  } else {
    res.status(404).json({ message: "Page not found" });
  }
});

// Start server only once
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Mail service available at: http://localhost:${PORT}/api/mail`);
  console.log(`🔐 Auth service available at: http://localhost:${PORT}/api/auth`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});