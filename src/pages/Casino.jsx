import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";

const Casino = () => {
  const [betNumber, setBetNumber] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const playSound = (name) => {
    const audio = new Audio(`/${name}.mp3`);
    audio.play();
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    playSound("spin");

    const target = Math.floor(Math.random() * 100) + 1;
    const rotation = 3600 + (360 - (target * 3.6)); // Each number has 3.6 degrees (360 / 100)

    wheelRef.current.style.transition = "transform 5s ease-out";
    wheelRef.current.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      setResult(target);
      setSpinning(false);

      if (target === Number(betNumber)) {
        playSound("coin");
        confetti({ particleCount: 150, spread: 70 });
      }
    }, 5200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">🎡 Casino Game</h1>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-lg mb-2">Enter your bet (1 - 100):</label>
        <input
          type="number"
          value={betNumber}
          onChange={(e) => setBetNumber(e.target.value)}
          min="1"
          max="100"
          className="w-full px-4 py-2 rounded-lg text-black text-lg"
        />
      </div>

      <div className="relative w-[300px] h-[300px]">
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-8 border-yellow-400 bg-[conic-gradient(#444_0_3.6deg,#222_3.6deg)] rotate-0"
          style={{ backgroundSize: "36deg 36deg", backgroundRepeat: "repeat" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500"></div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold rounded-xl"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {result && (
        <div className="mt-6 text-xl font-semibold">
          🎯 It landed on <span className="text-yellow-400">{result}</span>
          {Number(betNumber) === result ? (
            <div className="text-green-400 font-bold text-2xl mt-2">You WIN! 🎉</div>
          ) : (
            <div className="text-red-400 font-bold text-2xl mt-2">You Lose 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Casino;
