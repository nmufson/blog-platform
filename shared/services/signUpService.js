export const signUpUser = async ({
  email,
  username,
  password,
  confirmPassword,
  authorCode,
}) => {
  const response = await fetch('http://localhost:5000/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      username,
      password,
      confirmPassword,
      authorCode,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();

  return data;
};

export const checkEmailAvailability = async (email) => {
  try {
    console.log(email);
    const response = await fetch('http://localhost:5000/users/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.available; // bool
  } catch (error) {
    console.error('Error checking email availability:', error);
    return false;
  }
};

export const checkUsernameAvailability = async (username) => {
  try {
    const response = await fetch('http://localhost:5000/users/check-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.available; // bool
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false;
  }
};