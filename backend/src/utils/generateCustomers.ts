// Utility to generate and insert 1000 fake customer records into the database
import Customer from "../models/curtomer";
import { faker } from "@faker-js/faker";

export const generateFakeCustomers = async () => {
  // Check if there are already 1000 or more customers in the DB
  const existing = await Customer.countDocuments();
  if (existing >= 1000) return;

  const customers = [];

  // Generate 1000 fake customers with realistic name, ID and phone
  for (let i = 0; i < 1000; i++) {
    customers.push({
      name: faker.person.fullName(),
      id: faker.number.int({ min: 100000000, max: 999999999 }), // Israeli-like 9-digit ID
      phone: faker.helpers.replaceSymbols("+972-5##-###-####"), // Israeli phone format
    });
  }

  // Insert all generated customers into MongoDB
  await Customer.insertMany(customers);
  console.log("👥 1000 customers generated!");
};
