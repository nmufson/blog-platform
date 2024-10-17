import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logInUser } from '../../services/LogInService';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { validateLogin, handleAuthError } from './LogIn';
import LabelInput from '../../../author-frontend/src/components/LabelInput/LabelInput';
import styles from './LogIn.module.css';

const LogIn = () => {
  // make this into one object??
  const [formData, setFormData] = useState({ email: '', password: '' });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({ emailError: '', passwordError: '' });

    const errors = validateLogin(formData.email, formData.password);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const data = await logInUser(formData.email, formData.password); // Call the login service
      localStorage.setItem('token', data.token);

      // make it so navigates to previous page they were on
      // (could be a post or home)
      window.location.href = '/home';
    } catch (error) {
      handleAuthError(error, setFormErrors);
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.logInForm}
      id="logInForm"
      noValidate
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
