/**
 * CustomerItem.tsx
 * -----------------
 * Represents a single customer item in the customer list.
 *
 * Props:
 * - customer (Customer): An object containing name, ID, and phone number.
 *
 * Renders:
 * - A styled `<li>` element showing the customer's name, ID, and phone.
 *
 * Notes:
 * - The `key` prop should ideally be used in the parent (`map`) call,
 *   but placing it here does not cause issues in this isolated component.
 */
import "../../../App.css";
import "../../../CSS/CustomerPage/components/CustomerItem.css";
import { Customer } from "../Interfaces";

interface CustomerItemProps {
  customer: Customer;
}

const CustomerItem = ({ customer }: CustomerItemProps) => {
  return (
    <li className="customer-card">
      <strong>{customer.name}</strong>
      <div>ID: {customer.id}</div>
      <div>📞 {customer.phone}</div>
    </li>
  );
};

export default CustomerItem;
