export const validateLogin = (email, password) => {
  const formErrors = {};

  if (!email) {
    formErrors.emailError = 'Please include email.';
  } else if (!email.includes('@')) {
    formErrors.emailError = 'Please include valid email.';
  }

  if (!password) {
    formErrors.passwordError = 'Please include password.';
  }

  return formErrors;
};

export const handleAuthError = (error, setFormErrors) => {
  if (error.message.includes('email')) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      emailError: 'Invalid email. Please try again.',
    }));
  } else if (error.message.includes('password')) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      passwordError: 'Incorrect password. Please try again.',
    }));
  } else {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      passwordError: 'An unexpected error occurred. Please try again later.',
    }));
  }
  console.log(error);
};
