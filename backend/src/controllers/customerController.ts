// Controller to fetch customers from the database
// Supports optional search by name using case-insensitive regex
import { Request, Response } from "express";
import Customer from "../models/curtomer";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    // Build a search query: if 'name' is provided, use case-insensitive partial match
    const query = name
      ? { name: { $regex: new RegExp(name as string, "i") } }
      : {};

    // Retrieve matching customers from the database
    const customers = await Customer.find(query);
    res.json(customers);
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};
