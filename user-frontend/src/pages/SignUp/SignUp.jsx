import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateField } from './SignUp';
import { signUpUser } from '../../services/signUpService';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    usernameError: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // array of validation promises
    const validationPromises = Object.keys(formData).map((field) =>
      validateField(field, formData[field], formData, setFormErrors),
    );
    await Promise.all(validationPromises);

    const hasErrors = Object.values(formErrors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    try {
      console.log(formData);
      const data = await signUpUser(formData); // Use signupUser function with the formData
      localStorage.setItem('token', data.token);

      console.log('Signed up successfully:', data);

      window.location.href = '/';
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="signUpForm" noValidate>
      <fieldset>
        <legend>Sign Up</legend>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" // Add name attribute
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p className="error-message">{formErrors.emailError}</p>{' '}
          {/* Error display */}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" // Add name attribute
            value={formData.username}
            onChange={handleChange}
            required
          />
          <p className="error-message">{formErrors.usernameError}</p>{' '}
          {/* Error display */}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" // Add name attribute
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="error-message">{formErrors.passwordError}</p>{' '}
          {/* Error display */}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword" // Add name attribute
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <p className="error-message">{formErrors.confirmPasswordError}</p>{' '}
          {/* Error display */}
        </div>

        <button type="submit">Sign Up</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
