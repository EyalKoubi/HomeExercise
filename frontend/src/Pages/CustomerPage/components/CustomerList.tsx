/**
 * CustomerList.tsx
 * -----------------
 * Responsible for rendering a list of customer items.
 *
 * Props:
 * - currentCustomers (Customer[]): An array of customer objects to display.
 *
 * Renders:
 * - A `<ul>` list where each customer is displayed using the `CustomerItem` component.
 *
 * Notes:
 * - The key for each `CustomerItem` should ideally be passed in the `.map()` function.
 *   In this implementation, it’s currently inside `CustomerItem`, which is functional but not ideal.
 */
import "../../../App.css";
import "../../../CSS/CustomerPage/components/CustomerList.css";
import { Customer } from "../Interfaces";
import CustomerItem from "./CustomerItem";

interface CustomerListProps {
  currentCustomers: Customer[];
}

const CustomerList = ({ currentCustomers }: CustomerListProps) => {
  return (
    <ul className="customer-list">
      {currentCustomers.map((customer: Customer) => (
        <CustomerItem key={customer.id} customer={customer} />
      ))}
    </ul>
  );
};

export default CustomerList;
