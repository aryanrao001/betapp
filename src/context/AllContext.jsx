import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AllContext = createContext();

const AllContextProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("token")); // ✅ Load token initially from localStorage
  const [userDetails, setUserDetails] = useState();
  const [balance, setBalance] = useState();
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSummary = async () => {
      
      try {
        const response = await axios.post(backendUrl+'/api/user/fetchuser', {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // console.log(response.data.userData);
        // setSummary(response.data.transactions || []); // ✅ Fallback to empty array
        setUserDetails(response.data.userData);
        setBalance(response.data.userData.balance);
        // console.log(userDetails)
        // console.log(response.data.user_data)
      } catch (error) {
        console.error('Failed to fetch wallet summary:', error);
      }
    };

    fetchSummary();
  }, [update]);  


  const value = { backendUrl, setToken, token, balance , userDetails , setUpdate , update };

  return (
    <AllContext.Provider value={value}>
      {props.children}
    </AllContext.Provider>
  );
};

export default AllContextProvider;
