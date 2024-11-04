import { useState } from 'react';
import { validateField } from './SignUpUtils';
import { signUpUser } from '../../services/signUpService';
import DOMPurify from 'dompurify';
import LabelInput from '../../components/LabelInput/LabelInput';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    authorCode: '',
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

    setFormData((prevData) => ({
      ...prevData,

      [name]: DOMPurify.sanitize(value),
    }));

    if (touchedFields[name]) {
      validateField(name, value, formData, setFormErrors);
    }
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
    event.preventDefault();

    const validationPromises = Object.keys(formData).map((field) =>
      validateField(field, formData[field], formData, setFormErrors),
    );
    await Promise.all(validationPromises);

    const hasErrors = Object.values(formErrors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    try {
      const data = await signUpUser(formData);
      localStorage.setItem('token', data.token);

      window.location.href = '/';
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.signUpForm}
      id="signUpForm"
      noValidate
    >
      <fieldset>
        <legend>Sign Up</legend>

        <div className={`form-group ${styles.formGroup}`}>
          <LabelInput
            label="Email:"
            name="email"
            value={formData.email}
            type="email"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <LabelInput
            label="Username:"
            name="username"
            value={formData.username}
            type="text"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <LabelInput
            label="Password:"
            name="password"
            value={formData.password}
            type="password"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <LabelInput
            label="Confirm Password:"
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <LabelInput
            label="Author Code:"
            name="authorCode"
            value={formData.authorCode}
            type="password"
            formErrors={formErrors}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>

        <button type="submit">Sign Up</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
