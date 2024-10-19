import {
  checkEmailAvailability,
  checkUsernameAvailability,
} from '../../services/signUpService';

export const validateField = async (name, value, formData, setFormErrors) => {
  let updatedErrors = {
    emailError: '',
    usernameError: '',
    passwordError: '',
    confirmPasswordError: '',
    authorCodeError: '',
  };

  switch (name) {
    case 'email':
      updatedErrors = await validateEmail(value);
      break;

    case 'username':
      updatedErrors = await validateUsername(value);
      break;

    case 'password':
      updatedErrors = validatePassword(value);
      break;

    case 'confirmPassword':
      updatedErrors = validateConfirmPassword(value, formData.password);
      break;

    // case 'authorCode':
    //   updatedErrors = validateAuthorCode(value);
    //   break;

    default:
      break;
  }

  setFormErrors((prevErrors) => ({
    ...prevErrors,
    ...updatedErrors,
  }));
};

const validateEmail = async (value) => {
  const updatedErrors = { emailError: '' };

  if (!value) {
    updatedErrors.emailError = 'Email cannot be blank';
  } else if (!value.includes('@')) {
    updatedErrors.emailError = 'Invalid email format';
  } else {
    try {
      const isTaken = await checkEmailAvailability(value);
      if (isTaken) {
        updatedErrors.emailError = 'Email already in use';
      }
    } catch (error) {
      updatedErrors.emailError = 'Error checking email availability';
    }
  }

  return updatedErrors;
};

const validateUsername = async (value) => {
  const updatedErrors = { usernameError: '' };

  if (!value) {
    updatedErrors.usernameError = 'Username cannot be blank';
  } else if (value.length < 3) {
    updatedErrors.usernameError = 'Username must be at least 3 characters';
  } else if (value.length > 15) {
    updatedErrors.usernameError = 'Username cannot be more than 15 characters';
  } else {
    try {
      const isTaken = await checkUsernameAvailability(value);
      if (isTaken) {
        updatedErrors.usernameError = 'Username already in use';
      }
    } catch (error) {
      updatedErrors.usernameError = 'Error checking username availability';
    }
  }

  return updatedErrors;
};

const validatePassword = (value) => {
  const updatedErrors = { passwordError: '' };

  if (!value) {
    updatedErrors.passwordError = 'Password cannot be blank';
  } else if (value.length < 8) {
    updatedErrors.passwordError = 'Password must be at least 8 characters';
  } else if (!/\d/.test(value)) {
    updatedErrors.passwordError = 'Password must contain a number';
  } else if (!/[a-zA-Z]/.test(value)) {
    updatedErrors.passwordError =
      'Password must contain both lowercase and uppercase letters';
  } else if (!/[@$!%*?&#]/.test(value)) {
    updatedErrors.passwordError = 'Password must contain a special character';
  }

  return updatedErrors;
};

const validateConfirmPassword = (value, password) => {
  const updatedErrors = { confirmPasswordError: '' };

  if (value !== password) {
    updatedErrors.confirmPasswordError = 'Passwords do not match';
  }

  return updatedErrors;
};

// const validateAuthorCode = (value) => {
//   const updatedErrors = { authorCodeError: '' };

//   if (!value) {
//     updatedErrors.authorCodeError = 'Author code cannot be blank';
//   }

//   return updatedErrors;
// };
