import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logInUser } from '../../services/LogInService';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { validateLogin, handleAuthError } from './LogIn';
import styles from './LogIn.module.css';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '' });

    const errors = validateLogin(email, password);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const data = await logInUser(email, password); // Call the login service
      localStorage.setItem('token', data.token);

      console.log('Logged in successfully!', data);

      // make it so navigates to previous page they were on
      // (could be a post or home)
      window.location.href = '/home';
    } catch (error) {
      handleAuthError(error, setError);
    }
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error.email ? 'inputError' : ''}
          />
          <p className="error-message">{error.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error.password ? 'inputError' : ''}
          />
          <p className="error-message">{error.password}</p>
        </div>
        <button type="submit">Log In</button>
      </fieldset>

      <Link to="/signup">Create New Account</Link>
    </form>
  );
};

export default LogIn;
