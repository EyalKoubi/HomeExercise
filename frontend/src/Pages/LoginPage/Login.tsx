/**
 * Login.tsx
 * ------------
 * A simple login form component.
 *
 * - Renders username & password input fields.
 * - Submits credentials to the backend via POST request.
 * - On success: saves the JWT token to localStorage and navigates to /customers.
 * - On failure: shows an error message.
 *
 * Notes:
 * - Validation is handled on both frontend (via `required`) and backend (via Joi).
 * - Token is stored locally for use in protected routes.
 */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../CSS/LoginPage/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://homeexercise-1.onrender.com/api/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/customers");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
