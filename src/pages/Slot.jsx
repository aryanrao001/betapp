import React, { useContext, useState } from "react";
import confetti from "canvas-confetti";
import axios from "axios";
import { ArrowUp, ArrowDown } from 'lucide-react';

import miLogo from "../assets/images/mi-logo.avif";
import cskLogo from "../assets/images/csk-logo.avif";
import rcbLogo from "../assets/images/rcb-logo.avif";
import kkrLogo from "../assets/images/kkr-logo.avif";
import dcLogo from "../assets/images/dc-logo.avif";
import rrLogo from "../assets/images/rr-logo.avif";
import pbksLogo from "../assets/images/pbks-logo.avif";
import srhLogo from "../assets/images/srh-logo.avif";
import { AllContext } from "../context/AllContext";

const cricketTypes = [
  { value: "0", logo: miLogo, name: "Mumbai Indians" },
  { value: "1", logo: cskLogo, name: "Chennai Super Kings" },
  { value: "2", logo: rcbLogo, name: "Royal Challengers Bangalore" },
  { value: "3", logo: kkrLogo, name: "Kolkata Knight Riders" },
  { value: "4", logo: dcLogo, name: "Delhi Capitals" },
  { value: "5", logo: rrLogo, name: "Rajasthan Royals" },
  { value: "6", logo: pbksLogo, name: "Punjab Kings" },
  { value: "7", logo: srhLogo, name: "Sunrisers Hyderabad" },
];

const Slot= () => {
  const [slots, setSlots] = useState([cricketTypes[0].logo, cricketTypes[0].logo, cricketTypes[0].logo]);
  const [spinning, setSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [result, setResult] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { backendUrl } = useContext(AllContext);

  const playSound = (name) => {
    // Optional: Add sounds if needed
  };

  const spin = async () => {
    if (spinning || !betAmount || betAmount <= 0 || selectedItem === "") return;

    setSpinning(true);
    setResult("");
    playSound("spin");

    const sanitizedBetAmount = parseFloat(betAmount);
    if (isNaN(sanitizedBetAmount) || sanitizedBetAmount <= 0) return;

    // Start spinning animation
    const randomIndex = Math.floor(Math.random() * cricketTypes.length);
    const randomLogo = cricketTypes[randomIndex].logo;
    setSlots([randomLogo, randomLogo, randomLogo]);

    setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token missing");
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/games/slot`,
          { betAmount: sanitizedBetAmount, selectedItem },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response);
        console.log(selectedItem);

        setResult(response.data.message);

        const resultSide = response.data.resultSide;

        if (resultSide !== undefined && cricketTypes[resultSide]) {
          const logo = cricketTypes[resultSide].logo;
          setSlots([logo, logo, logo]);

          if (response.data.win) {
            confetti();
          }
        }
      } catch (error) {
        if (error.response) {
          console.error("API Error:", error.response.data);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setSpinning(false);
      }
    }, 1500);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.value);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="py-30 min-h-screen bg-gradient-to-br from-green-900 to-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">🏏 IPL Spin & Win</h1>

      <div id="slot-box" className="bg-gray-900 rounded-3xl p-10 shadow-2xl w-full max-w-3xl transition-all duration-500">

        {/* Slot Display */}
        <div className={`flex gap-2 mb-10 justify-center ${spinning ? "scroll-effect" : ""}`}>
          {slots.map((item, index) => (
            <div key={index} className="h-32 sm:h-20 md:p-6 md:h-50 w-full bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner">
              <img src={item} alt={`Team ${index}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>

        {/* Bet Inputs */}
        <div className="flex flex-col gap-6 mb-6">
          <input
            type="number"
            placeholder="Enter Amount to Bet"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-5 py-3 text-white text-lg rounded-xl focus:outline-none border-2 border-yellow-400 bg-gray-800"
          />

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="w-full px-5 py-3 text-white text-lg rounded-xl focus:outline-none border-2 border-yellow-400 bg-gray-800 flex items-center justify-between"
            >
              {selectedItem !== "" ? (
                <>
                  <img src={cricketTypes[selectedItem].logo} alt="Selected Team" className="h-6 w-6 mr-2" />
                  {cricketTypes[selectedItem].name}
                </>
              ) : (
                "Select IPL Team to Bet On"
              )}
              <span className="material-icons">
                {dropdownOpen ? <ArrowUp strokeWidth={3} /> : <ArrowDown strokeWidth={3} />}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute w-full bg-gray-800 mt-2 rounded-xl shadow-lg">
                {cricketTypes.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    className="px-5 py-3 flex items-center cursor-pointer hover:bg-gray-700"
                  >
                    <img src={item.logo} alt={`Team ${index}`} className="h-6 w-6 mr-2" />
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={spin}
            className={`px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl text-xl transition duration-300 ${spinning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {spinning ? "Spinning..." : "Place Bet"}
          </button>
        </div>

        {/* Bet & Result Info */}
        <div className="text-center text-xl font-semibold mb-3">
          💸 Bet Amount: ₹{betAmount || 0}
        </div>

        {result && (
          <div
            className={`text-center text-3xl font-bold mt-4 ${
              result.includes("WIN") ? "text-green-400" : "text-red-400"
            }`}
          >
            {result}
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          25% { transform: translateY(-20px); }
          50% { transform: translateY(20px); }
          75% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .scroll-effect {
          animation: scroll 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Slot;
