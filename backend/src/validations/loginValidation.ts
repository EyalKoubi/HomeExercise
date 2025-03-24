// Joi schema for validating login request body
import Joi from "joi";

// Defines the structure and rules for login payload
export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
