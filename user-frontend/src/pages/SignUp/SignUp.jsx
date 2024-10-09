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
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form input values
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (touchedFields[name]) {
      validateField(name, value, formData, setFormErrors);
    }

    // validateField(name, value, formData, setFormErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, value, formData, setFormErrors);
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
            onBlur={handleBlur}
            className={formErrors.emailError ? 'inputError' : ''}
            required
          />
          <p className="error-message">{formErrors.emailError}</p>{' '}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" // Add name attribute
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={formErrors.usernameError ? 'inputError' : ''}
            required
          />
          <p className="error-message">{formErrors.usernameError}</p>{' '}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" // Add name attribute
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={formErrors.passwordError ? 'inputError' : ''}
            required
          />
          <p className="error-message">{formErrors.passwordError}</p>{' '}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword" // Add name attribute
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={formErrors.confirmPasswordError ? 'inputError' : ''}
            required
          />
          <p className="error-message">{formErrors.confirmPasswordError}</p>{' '}
        </div>

        <button type="submit">Sign Up</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
