import React, { useContext, useState } from "react";
import confetti from "canvas-confetti";
import axios from "axios";
import { ArrowUp, ArrowDown, CircleX } from 'lucide-react';
import { AllContext } from "../context/AllContext";

// Team logos
import miLogo from "../assets/images/mi-logo.avif";
import cskLogo from "../assets/images/csk-logo.avif";
import rcbLogo from "../assets/images/rcb-logo.avif";
import kkrLogo from "../assets/images/kkr-logo.avif";
import dcLogo from "../assets/images/dc-logo.avif";
import rrLogo from "../assets/images/rr-logo.avif";
import pbksLogo from "../assets/images/pbks-logo.avif";
import srhLogo from "../assets/images/srh-logo.avif";
import lose from "../assets/images/lose.png";
import win from "../assets/images/win.png";

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

const getRandomIndex = () => Math.floor(Math.random() * cricketTypes.length);

const SlotMachine = () => {
  const { backendUrl, setUpdate } = useContext(AllContext);
  const [betAmount, setBetAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [reels, setReels] = useState([[], [], []]);
//   const [reels, setReels] = useState([
//     [cricketTypes[getRandomIndex()]],
//     [cricketTypes[getRandomIndex()]],
//     [cricketTypes[getRandomIndex()]]
//     ]);

const [reels, setReels] = useState([
  // First column (top to bottom)
  [
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
  ],
  // Second column (top to bottom)
  [
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
  ],
  // Third column (top to bottom)
  [
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
    // cricketTypes[getRandomIndex()],
  ],
]);
  const [showPopup, setShowPopup] = useState(false);

  const spin = async () => {
    if (spinning || !betAmount || betAmount <= 0 || selectedItem === "") return;

    setSpinning(true);
    setResult("");
    setShowPopup(false);

    const newReels = [[], [], []];
    const spinCycles = 20;

    for (let i = 0; i < spinCycles; i++) {
      newReels[0].push(cricketTypes[getRandomIndex()]);
      newReels[1].push(cricketTypes[getRandomIndex()]);
      newReels[2].push(cricketTypes[getRandomIndex()]);
    }

    setReels(newReels.map(reel => [...reel]));

    setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.post(
          `${backendUrl}/api/games/slot`,
          {
            betAmount: parseFloat(betAmount),
            selectedItem,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        const resultSide = response.data.resultSide;
        if (resultSide !== undefined) {
          const finalLogo = cricketTypes[resultSide];


           setReels([
                [
                  cricketTypes[getRandomIndex()],
                  finalLogo,
                  // cricketTypes[getRandomIndex()],
                  cricketTypes[getRandomIndex()],
                ],
                [
                  cricketTypes[getRandomIndex()],
                  finalLogo,
                  cricketTypes[getRandomIndex()],
                ],
                [
                  cricketTypes[getRandomIndex()],
                  finalLogo,
                  // cricketTypes[getRandomIndex()],
                  cricketTypes[getRandomIndex()],
                ],
                   

            // [finalLogo],
                // [finalLogo],
                // [cricketTypes[getRandomIndex()]],
            ]);

          // setReels([
          //       [cricketTypes[getRandomIndex()]],

          //   // [finalLogo],
          //       [finalLogo],
          //       [cricketTypes[getRandomIndex()]],

          //   //   [finalLogo],
          //   ]);
        //   setReels([[finalLogo], [finalLogo], [finalLogo]]);

          if (response.data.win) confetti();
        }

        setResult(response.data.message);
        setUpdate(1);
        setShowPopup(true);
      } catch (err) {
        console.error("Spin Error:", err);
      } finally {
        setSpinning(false);
      }
    }, 1500);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.value);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-black min-h-screen flex items-start mt-19 justify-center py-8">
      <div className="w-[360px] h-[640px] bg-gray-900 flex flex-col justify-start rounded-xl overflow-hidden border-2 border-black relative shadow-2xl">

        {/* Balance */}
        <div className="bg-yellow-400 text-center text-2xl font-bold py-2">
          ₹{betAmount || 0}.00
        </div>

        {/* Slot Reels */}
        <div className="flex justify-center items-center h-64 bg-gradient-to-b from-blue-900 to-black overflow-hidden relative">
          {reels.map((column, colIndex) => (
            <div
              key={colIndex}
              className="w-24 h-60 flex items-start justify-center mx-1 overflow-hidden bg-white rounded-md shadow-inner"
            >
              <div
                className={`flex flex-col items-center transition-transform duration-[1500ms] ${
                  spinning ? "-translate-y-[85%]" : ""
                }`}
              >
                {column.map((item, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-white m-1 rounded-lg flex items-center justify-center shadow-md"
                  >
                    <img src={item.logo} alt={item.name} className="h-14" />
                  </div>
                ))}

                {column.map((item, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-white m-1 rounded-lg flex items-center justify-center shadow-md"
                  >
                    <img src={item.logo} alt={item.name} className="h-14" />
                  </div>
                ))}

                {column.map((item, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-white m-1 rounded-lg flex items-center justify-center shadow-md"
                  >
                    <img src={item.logo} alt={item.name} className="h-14" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bet Input + Team Select */}
        <div className="p-4 space-y-4">
          <input
            type="number"
            placeholder="Enter Bet Amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-4 py-2 text-white text-sm rounded-md border-2 border-yellow-400 bg-gray-800"
          />

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-2 text-white rounded-md border-2 border-yellow-400 bg-gray-800"
            >
              {selectedItem !== "" ? (
                <>
                  <img
                    src={cricketTypes[selectedItem].logo}
                    alt="Selected"
                    className="h-6 w-6 mr-2"
                  />
                  {cricketTypes[selectedItem].name}
                </>
              ) : (
                "Select Team"
              )}
              {dropdownOpen ? <ArrowUp /> : <ArrowDown />}
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full bg-gray-800 z-10 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                {cricketTypes.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    className="px-4 py-2 flex items-center hover:bg-gray-700 cursor-pointer"
                  >
                    <img src={item.logo} alt={item.name} className="h-6 w-6 mr-2" />
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            className={`w-full px-4 py-2 font-bold rounded-md text-black bg-yellow-400 hover:bg-yellow-500 ${
              spinning ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {spinning ? "Spinning..." : "Place Bet"}
          </button>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`text-center text-xl font-bold mt-2 ${
              result.includes("You Win") ? "text-green-400" : "text-red-400"
            }`}
          >
            {result}
          </div>
        )}

        {/* Result Popup */}
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#000000ce] bg-opacity-50 flex justify-center items-center z-20">
            <div className="p-6 rounded-xl text-center">
              <div 
                onClick={() => setShowPopup(false)}
               className="text-right flex justify-end pr-5 pb-4  " ><CircleX /> </div>
              <h2
                className={`text-2xl font-bold ${
                  result.includes("You Win") ? "text-green-500" : "text-red-500"
                }`}
              >
                <img src={result.includes("You Win") ? win : lose} alt="" />
                {/* {result.includes("You Win") ? "You Win!" : "You Lose!"} */}
              </h2>
              {/* <p className="mt-2">{result}</p> */}
              {/* <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-6 py-2 bg-[#710413] text-white rounded-md"
              >
                Close
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotMachine;
