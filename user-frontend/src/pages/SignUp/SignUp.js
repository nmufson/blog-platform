export const validateField = (name, value) => {
  switch (name) {
    case "email":
      if (!value.includes("@")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          emailError: "Invalid email format",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          emailError: "",
        }));
      }
      break;

    case "username":
      if (value.length < 3) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          usernameError: "Username must be at least 3 characters",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          usernameError: "",
        }));
      }
      break;

    case "password":
      if (value.length < 8) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "Password must be at least 8 characters",
        }));
      } else if (!/\d/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "Password must contain a number",
        }));
      } else if (!/[a-zA-Z]/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError:
            "Password must contain both lowercase and uppercase letters",
        }));
      } else if (!/[@$!%*?&#]/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "Password must contain a special character",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "",
        }));
      }
      break;

    case "confirmPassword":
      if (value !== formData.password) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPasswordError: "Passwords do not match",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPasswordError: "",
        }));
      }
      break;

    default:
      break;
  }
};

// formValidation.js
export const validateEmail = async (email, setEmailError) => {
  if (!email) {
    setEmailError("Email cannot be blank");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setEmailError("Invalid email format");
    return false;
  }

  try {
    const isTaken = await checkEmailAvailability(email); // bool
    if (isTaken) {
      setEmailError("Email already in use");
      return false;
    } else {
      setEmailError(""); // Clear error if no issues
      return true;
    }
  } catch (error) {
    setEmailError("Error checking email availability");
    return false;
  }
};

export const validateUsername = async (username, setUsernameError) => {
  if (!username) {
    setUsernameError("Username cannot be blank");
    return false;
  }

  if (username.length < 3) {
    setUsernameError("Username must be at least 3 characters long");
    return false;
  }

  // Now check if username is already taken
  try {
    const isTaken = await checkUsernameAvailability(username);
    if (isTaken) {
      setUsernameError("Username already in use");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  } catch (error) {
    setUsernameError("Error checking username availability");
    return false;
  }
};

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain a number");
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain both lowercase and uppercase letters");
  }
  if (!/[@$!%*?&#]/.test(password)) {
    errors.push("Password must contain a special character");
  }

  return errors;
};
