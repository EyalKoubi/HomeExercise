// Mongoose model for Customer entity
// Defines the schema for customer documents in MongoDB, including validations
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Must be provided
    trim: true, // Removes leading/trailing whitespace
    minlength: 2,
    maxlength: 50,
  },
  id: {
    type: Number,
    required: true, // Must be provided
    unique: true, // Ensures no duplicate IDs
    min: 100000000, // 9-digit minimum
    max: 999999999, // 9-digit maximum
  },
  phone: {
    type: String,
    required: true, // Must be provided
    match: /^\+972-5\d{2}-\d{3}-\d{4}$/, // Validates Israeli mobile phone format
  },
});

// Exporting the Customer model to interact with the 'customers' collection
export default mongoose.model("Customer", customerSchema);
