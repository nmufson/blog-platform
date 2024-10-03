import React, { createContext, useContext, useState } from "react";

// Create a context
const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null, // Initial state can be anything you need
    // Add other state variables as needed
  });

  // Provide the state and setter function to the children
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useMyContext = () => useContext(MyContext);
