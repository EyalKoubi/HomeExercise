/**
 * Customer Interface
 * ------------------
 * Represents a single customer entity in the application.
 *
 * Properties:
 * - name (string): The full name of the customer.
 * - id (number): A unique 9-digit numeric identifier for the customer.
 * - phone (string): The customer's phone number in Israeli format (e.g., +972-5##-###-####).
 */
export interface Customer {
  name: string;
  id: number;
  phone: string;
}
