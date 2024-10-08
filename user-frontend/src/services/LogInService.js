export const logInUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data; // Return the response data if needed
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
