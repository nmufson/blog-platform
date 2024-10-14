export const validateLogin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'Please include email.';
  }

  if (!password) {
    errors.password = 'Please include password.';
  }

  return errors;
};

export const handleAuthError = (error, setError) => {
  if (error.message.includes('email')) {
    setError((prevError) => ({
      ...prevError,
      email: 'Invalid email. Please try again.',
    }));
  } else if (error.message.includes('password')) {
    setError((prevError) => ({
      ...prevError,
      password: 'Incorrect password. Please try again.',
    }));
  } else {
    // Handle other types of errors or set a general error message
    setError((prevError) => ({
      ...prevError,
      password: 'An unexpected error occurred. Please try again later.',
    }));
  }
};
