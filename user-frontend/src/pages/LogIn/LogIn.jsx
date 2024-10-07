import { useState } from "react";
import { Link } from "react-router-dom";
import { logInUser } from "../../services/LogInService";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await logInUser(email, password); // Call the login service

      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      setUser(decodedToken);

      console.log("Logged in successfully!", data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Log In</legend>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="error-message">
              {error === "Invalid email"
                ? "Invalid email. Please try again."
                : ""}
            </p>
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
            <p className="error-message">
              {error === "Incorrect password"
                ? "Incorrect password. Please try again."
                : ""}
            </p>
          </div>
          <p className="error-message">
            {error &&
            error !== "Invalid email" &&
            error !== "Incorrect password"
              ? error
              : ""}
          </p>{" "}
          {/* Display any other error messages */}
          <button type="submit">Log In</button>
        </fieldset>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Create New Account</Link>
      </p>
    </div>
  );
};

export default LogIn;
