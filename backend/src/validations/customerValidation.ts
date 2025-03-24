// Joi schema for validating login request body
import Joi from "joi";

// Defines the structure and rules for login payload
export const customerQuerySchema = Joi.object({
  name: Joi.string().optional(),
});
