// src/pages/Wallet.js
import React, { useContext, useEffect, useState } from 'react';
import { AllContext } from '../context/AllContext';
import { Coins } from 'lucide-react'; // Lucide icon
import axios from 'axios';

const Wallet = () => {
  const {
    userDetails,
    // setUserDetails,         // ✅ Added
    token,
    backendUrl,
    balance,
    setUpdate, 
    update
  } = useContext(AllContext);

  // const [balance, setBalance] = useState(userDetails?.balance || 0); // ✅ Balance managed locally
  const [activities, setActivities] = useState([]); // ✅ Dynamic activity state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/history`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response)
        // setUserDetails(response.data.userData);
        // setBalance(response.data.userData.balance);
        setActivities(response.data.data || []); // ✅ Get history data
      } catch (error) {
        console.error('Failed to fetch wallet summary:', error);
      } finally {
        setLoading(false);
      }
    };

    setUpdate(!update);

    fetchSummary();
  }, [token, backendUrl]);

  return (
    <div className="w-full h-auto mt-10 flex flex-col bg-[#121212] text-white">
      <div className="flex flex-col items-center px-4 pt-20 pb-6 space-y-6 overflow-auto">
        
        {/* Balance Card */}
        <div className="w-full max-w-md bg-[#333333] rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-[#8e8e8e] mb-2">Available Coins</h2>
          {loading ? (
            <div className="text-[#1DB954] text-xl animate-pulse">Loading...</div>
          ) : (
            <div className="text-4xl font-bold text-[#1DB954] flex items-center gap-2">
              <Coins className="w-6 h-6" /> {balance.toFixed(2)}
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="w-full pb-20 overflow-auto max-w-md">
          <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
          <div className="bg-white rounded-2xl shadow-md p-4 space-y-4 text-black">
            {loading ? (
              <p className="text-gray-500 text-center">Loading history...</p>
            ) : activities.length === 0 ? (
              <p className="text-gray-500 text-center">No activity found.</p>
            ) : (
              activities.map((item, index) => {
                const result = item.result || item.status;
                const isWin = result === 'win';
                const date = new Date(item.createdAt).toLocaleDateString('en-GB'); // Native JS date formatting
                return (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-none">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold uppercase text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                        {item.type[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{item.type} - Bet on {item.chosenSide}</p>
                        <p className="text-xs text-gray-400">Result: {item.resultSide}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${isWin ? 'text-green-500' : 'text-red-500'}`}>
                        ${item.betAmount}
                      </p>
                      <p className="text-xs text-gray-400">{date}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wallet;
