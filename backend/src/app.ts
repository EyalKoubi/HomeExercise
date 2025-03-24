import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import customerRoutes from "./routers/customerRoutes";
import { generateFakeCustomers } from "./utils/generateCustomers";
import authRoutes from "./routers/authRoutes";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Public route for login
app.use("/api/login", authRoutes);

// Protected route for customer operations
app.use("/api/customers", authenticate, customerRoutes);

// Connect to MongoDB and generate customers if needed
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Seed database with 1000 fake customers if collection is empty
    await generateFakeCustomers();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });
