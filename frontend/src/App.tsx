/**
 * App.tsx
 * ------------
 * Main entry point for the React frontend routing.
 * Defines the application routes using React Router:
 * - "/" renders the Login screen
 * - "/customers" renders the Customer Search screen
 *
 * React Router handles SPA-style navigation without reloading the page.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Customers from "./Pages/CustomerPage/Customers";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Router>
  );
}

export default App;
