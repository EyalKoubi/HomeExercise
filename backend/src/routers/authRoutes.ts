// Routes for authentication (login only)
import express from "express";
import { login } from "../controllers/authController";

const router = express.Router();

// POST /api/login - Authenticates user credentials and returns a JWT token
router.post("/", login);

export default router;
