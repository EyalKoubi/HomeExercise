/**
 * Customers.tsx
 * ------------------
 * Displays a protected customer search screen.
 *
 * Functionality:
 * - Fetches customer data from the backend using an authenticated request.
 * - Implements "quick search" with a debounce effect (400ms).
 * - Paginates the customer list (default: 3 customers per page).
 * - Provides a logout button that clears the JWT token and redirects to login.
 * - Renders a child component <CustomerList /> to show individual customers.
 *
 * Notes:
 * - If the user has no token, they are redirected to the login page.
 * - Uses `useEffect` to trigger search on each change to `searchTerm`.
 * - Search and pagination are handled on the frontend.
 */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../CSS/CustomerPage/Customer.css";
import CustomerList from "./components/CustomerList";
import { Customer } from "./Interfaces";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 3;
  const navigate = useNavigate();

  const fetchCustomers = async (query: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get(
        `http://localhost:4000/api/customers?name=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCustomers(response.data);
      setError("");
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to fetch customers");
      setCustomers([]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCustomers(searchTerm);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="form-wrapper">
      <div className="top-bar">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>Customer Search</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search customers by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}
      {currentCustomers.length > 0 ? (
        <CustomerList currentCustomers={currentCustomers} />
      ) : (
        <p style={{ textAlign: "center" }}>No customers found.</p>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPrev} disabled={currentPage === 1}>
            ⬅ Prev
          </button>
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Customers;
