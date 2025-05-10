import React, { createContext, useEffect, useState } from 'react';

export const AllContext = createContext();

const AllContextProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("token")); // ✅ Load token initially from localStorage

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = { backendUrl, setToken, token };

  return (
    <AllContext.Provider value={value}>
      {props.children}
    </AllContext.Provider>
  );
};

export default AllContextProvider;
