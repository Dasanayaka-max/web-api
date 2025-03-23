require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

const app = express();

// Middleware to handle CORS and JSON request body
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const serviceProviderRoutes = require("./src/routes/serviceProviderRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const servicesRoutes = require("./src/routes/servicesRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/providers", serviceProviderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/services", servicesRoutes);

// Test route to verify if the API is running
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
