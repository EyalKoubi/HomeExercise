// Routes for customer-related API endpoints (requires authentication)
import express from "express";
import { getCustomers } from "../controllers/customerController";

const router = express.Router();

// GET /api/customers - Returns a filtered list of customers based on query (e.g. name)
router.get("/", getCustomers);

export default router;
