"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Ensure the token exists and follows the "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        // Verify the token using the secret key from environment variables
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route handler
    }
    catch (_a) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};
exports.authenticate = authenticate;
