import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logInUser } from '../../services/LogInService';
import { validateLogin, handleAuthError } from './LogIn';
import LabelInput from '../../components/LabelInput/LabelInput';
import styles from './LogIn.module.css';
import DOMPurify from 'dompurify';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({ emailError: '', passwordError: '' });

    const errors = validateLogin(formData.email, formData.password);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const data = await logInUser(formData.email, formData.password);
      localStorage.setItem('token', data.token);

      window.location.href = '/home';
    } catch (error) {
      handleAuthError(error, setFormErrors);
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: DOMPurify.sanitize(value),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.logInForm}
      id="logInForm"
      noValidate
      onClick={() => console.log(formData)}
    >
      <fieldset>
        <legend>Log In</legend>
        <div className="form-group">
          <LabelInput
            label="Email:"
            name="email"
            value={formData.email}
            type="email"
            formErrors={formErrors}
            onChange={(e) => handleChange(e, 'email')}
          ></LabelInput>
        </div>
        <div className="form-group">
          <LabelInput
            label="Password:"
            name="password"
            value={formData.password}
            type="password"
            formErrors={formErrors}
            onChange={(e) => handleChange(e, 'password')}
          ></LabelInput>
        </div>
        <button type="submit">Log In</button>
      </fieldset>

      <Link to="/signup">Create New Account</Link>
    </form>
  );
};

export default LogIn;
