import React, { createContext, useContext, useState } from 'react';

// Create the context
const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [state, setState] = useState(null);

  // Value that will be accessible to components using this context
  const value = {
    state,
    setState,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
