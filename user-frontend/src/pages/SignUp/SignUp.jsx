import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateField } from "./SignUp";

const SignUp = () => {
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
    const errors = validateField(name, value, formData, setFormErrors);

    console.log(errors);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create an array of validation promises
    const validationPromises = Object.keys(formData).map((field) =>
      validateField(field, formData[field], formData, setFormErrors),
    );
    await Promise.all(validationPromises);

    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    if (hasErrors) {
      return; // Exit if there are validation errors
    }

    // If there are no errors, send the form data to the backend
    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        // Update with your actual endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful response
      const responseData = await response.json();
      console.log("Success:", responseData);
      navigate("/");
    } catch (error) {
      console.error("Error during submission:", error);
      // Set form errors if needed
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        submitError: "An error occurred while submitting the form.",
      }));
    }
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
              name="email" // Add name attribute
              value={formData.email}
              onChange={handleChange}
              required
            />
            <p className="error-message">{formErrors.emailError}</p>{" "}
            {/* Error display */}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username" // Add name attribute
              value={formData.username}
              onChange={handleChange}
              required
            />
            <p className="error-message">{formErrors.usernameError}</p>{" "}
            {/* Error display */}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password" // Add name attribute
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="error-message">{formErrors.passwordError}</p>{" "}
            {/* Error display */}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword" // Add name attribute
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <p className="error-message">{formErrors.confirmPasswordError}</p>{" "}
            {/* Error display */}
          </div>

          <button type="submit">Sign Up</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
