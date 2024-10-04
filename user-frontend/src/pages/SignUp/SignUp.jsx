import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signupUser,
  checkEmailAvailability,
  checkUsernameAvailability,
} from "../services/SignupService"; // Import your services

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form input values
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Run validation for the field being changed
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation for all fields before submission
    validateEmail();
    // ... add other validation functions as needed
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Sign Up</legend>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <p className="error-message">{emailError}</p> {/* Error display */}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <p className="error-message">{usernameError}</p>{" "}
            {/* Error display */}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <p className="error-message">{passwordError}</p>{" "}
            {/* Error display */}
          </div>

          <button type="submit">Sign Up</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignupForm;
