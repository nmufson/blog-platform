export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json(); // Return the response data if needed
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
