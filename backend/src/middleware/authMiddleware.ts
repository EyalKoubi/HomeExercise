// Authentication middleware for protected routes
// Validates the presence and correctness of a JWT token in the Authorization header
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include a 'user' property after decoding the token
interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Ensure the token exists and follows the "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Attach the decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
