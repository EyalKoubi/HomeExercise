// Controller to handle user login
// - Validates request body using Joi schema
// - Checks against hardcoded user credentials
// - Returns a signed JWT token on success
// - Returns appropriate error messages on failure
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginSchema } from "../validations/loginValidation";

const USERS: { [key: string]: string } = {
  admin: "admin",
  user: "user",
};

export const login = (req: Request, res: Response) => {
  // Validate the incoming request using Joi schema
  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }

  const { username, password } = req.body;

  // Check if the credentials match the hardcoded users
  if (USERS[username] && USERS[username] === password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  }

  // If credentials are invalid
  res.status(401).json({ error: "Invalid username or password" });
};
