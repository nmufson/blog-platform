const API_URL = import.meta.env.VITE_API_URL;

export const logInUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
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
