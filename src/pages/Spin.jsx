import React, { useState } from "react";
import confetti from "canvas-confetti";

const cricketTypes = [
  { label: "🏏 Bat", value: "🏏" },
  { label: "🏐 Ball", value: "🏐" },
//   { label: "🧤 Gloves", value: "🧤" },
  { label: "🏆 Trophy", value: "🏆" },
//   { label: "🎯 Target", value: "🎯" },
//   { label: "🥅 Stumps", value: "🥅" },
];

const Spin = () => {
  const [slots, setSlots] = useState(["🏏", "🏏", "🏏"]);
  const [spinning, setSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [result, setResult] = useState("");

  const playSound = (name) => {
    const audio = new Audio(`/${name}.mp3`);
    audio.play().catch((err) => {
      console.error(`Failed to play ${name} sound:`, err);
    });
  };

  const spin = () => {
    if (spinning || !betAmount || betAmount <= 0 || !selectedItem) return;

    setSpinning(true);
    setResult("");
    playSound("spin");

    setTimeout(() => {
      const randomItem = cricketTypes[Math.floor(Math.random() * cricketTypes.length)].value;
      setSlots([randomItem, randomItem, randomItem]);
      setSpinning(false);

      const el = document.getElementById("slot-box");

      if (randomItem === selectedItem) {
        setResult("🎉 You WIN!");
        playSound("coin");
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      } else {
        setResult("😢 You Lose");

        // Fix: Force reflow before re-adding animation class
        if (el) {
          el.classList.remove("animate-shake");
          void el.offsetWidth; // Force reflow
          el.classList.add("animate-shake");
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">🏏 Cricket Spin & Win</h1>

      <div
        id="slot-box"
        className="bg-gray-900 rounded-3xl p-10 shadow-2xl w-full max-w-3xl transition-all duration-500"
      >
        {/* Slot Display */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {slots.map((item, index) => (
            <div
              key={index}
              className="h-32 sm:h-40 md:h-48 bg-gray-800 rounded-2xl flex items-center justify-center text-5xl shadow-inner border-4 border-yellow-500"
            >
              {item}
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

          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full px-5 py-3 text-white text-lg rounded-xl focus:outline-none border-2 border-yellow-400 bg-gray-800"
          >
            <option value="">Select Item to Bet On</option>
            {cricketTypes.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            onClick={spin}
            className={`px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl text-xl transition duration-300 ${
              spinning ? "opacity-50 cursor-not-allowed" : ""
            }`}
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

      {/* Shake Animation Style */}
      <style>{`
        .animate-shake {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Spin;
