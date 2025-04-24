import React, { useState, useEffect } from "react";

const Toss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [message, setMessage] = useState("");
  const [flipClass, setFlipClass] = useState("");
  const [timer, setTimer] = useState(30);
  const [isBetAllowed, setIsBetAllowed] = useState(true);
  const [betAmount, setBetAmount] = useState(0);
  const [totalBets, setTotalBets] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(["Rajat", "Aman", "Divya", "Preeti", "Suresh"]);
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          autoFlip(); // do coin flip
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userChoice, betAmount]);

  useEffect(() => {
    setIsBetAllowed(timer > 10); // only allow betting when timer > 10s
  }, [timer]);

  const autoFlip = () => {
    setIsFlipping(true);
    setMessage("");
    setFlipClass("");

    setTimeout(() => {
      const outcomes = ["heads", "tails"];
      const outcome = outcomes[Math.floor(Math.random() * 2)];
      setResult(outcome);
      setFlipClass(outcome === "heads" ? "flip-head" : "flip-tail");
      setIsFlipping(false);

      if (userChoice && betAmount > 0) {
        const newBet = {
          name: "Rajat",
          choice: userChoice,
          amount: betAmount,
          time: new Date().toLocaleTimeString(),
        };
        setBetHistory((prev) => [newBet, ...prev]);
        setTotalBets((prev) => prev + betAmount);

        if (userChoice === outcome) {
          const win = betAmount * 2;
          setWinAmount((prev) => prev + win);
          setMessage(`🎉 You won ₹${win}! It's ${outcome.toUpperCase()}`);
        } else {
          setMessage(`😢 You lost ₹${betAmount}. It's ${outcome.toUpperCase()}`);
        }
      } else {
        setMessage(`🪙 Result: ${outcome.toUpperCase()} (No bet placed)`);
      }

      // Reset user input for next round
      setUserChoice(null);
      setBetAmount(0);
    }, 500);
  };

  const handleUserBet = (choice) => {
    if (!isBetAllowed || betAmount <= 0) return;
    setUserChoice(choice);
    setMessage(`🎯 You chose ${choice.toUpperCase()}! Waiting for flip...`);
  };

  return (
    <div className="bg-gradient-to-br pt-9 from-[#191919] via-[#0f0f0f] to-[#191919] text-white min-h-screen font-sans">
      <div className="py-16 text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 animate-pulse">
          Flip Frenzy
        </h1>
        <p className="text-md text-gray-300 mt-2">Win big or cry trying 😎</p>
        <p className="mt-4 text-amber-300 text-lg font-mono">Next Flip In: {timer}s</p>
      </div>

      <div className="flex justify-center items-center flex-col px-4">
        <div className="relative w-40 h-40 mb-8">
          <div className={`w-full h-full rounded-full transition-transform duration-700 ease-in-out transform ${flipClass} ${isFlipping ? "animate-spin-slow" : ""}`}>
            <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl font-bold border-4 border-yellow-700 ${flipClass === "flip-head" ? "bg-yellow-700" : "bg-yellow-500"}`}>
              <span className="text-white">{flipClass === "flip-head" ? "HEAD" : "TAIL"}</span>
            </div>
          </div>
        </div>

        {message && <p className="text-lg font-bold text-emerald-300 mb-4 animate-bounce">{message}</p>}

        <input
          type="number"
          placeholder="Enter Bet Amount"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="mb-4 px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 w-60 text-center"
        />

        <div className="flex gap-6">
          <button
            disabled={!isBetAllowed || betAmount <= 0}
            onClick={() => handleUserBet("heads")}
            className="px-6 py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold shadow-md transition disabled:opacity-40"
          >
            Call Heads
          </button>
          <button
            disabled={!isBetAllowed || betAmount <= 0}
            onClick={() => handleUserBet("tails")}
            className="px-6 py-3 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold shadow-md transition disabled:opacity-40"
          >
            Call Tails
          </button>
        </div>

        {!isBetAllowed && (
          <p className="text-red-400 font-semibold mt-4 animate-pulse">
            ⏳ Betting closed! Wait for next round...
          </p>
        )}
      </div>

      <div className="py-12 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {["Total Bets", "Total Winnings", "Your Win Rate", "Luck Meter"].map((label, idx) => {
          const value =
            idx === 0 ? `₹${totalBets}` :
            idx === 1 ? `₹${winAmount}` :
            totalBets > 0 ? `${Math.round((winAmount / totalBets) * 100)}%` : "0%";
          return (
            <div key={idx} className="bg-[#1f1f1f] backdrop-blur-md p-6 rounded-xl text-center border border-zinc-700">
              <p className="text-2xl font-bold text-yellow-400">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111] max-w-4xl mx-auto p-6 rounded-xl mt-8 text-center border border-zinc-800">
        <h3 className="text-lg font-semibold text-amber-300 mb-3">Active Bettors</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {activeUsers.map((user, index) => (
            <span key={index} className="px-4 py-1 bg-zinc-800 text-white text-sm rounded-full border border-zinc-600">
              {user}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h3 className="text-lg font-semibold text-yellow-300 mb-4 text-center">Recent Bets</h3>
        <div className="grid gap-4">
          {betHistory.map((bet, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border shadow text-white text-sm font-mono ${idx % 3 === 0 ? "bg-amber-800" : idx % 3 === 1 ? "bg-yellow-700" : "bg-zinc-800"}`}
            >
              {bet.name} bet ₹{bet.amount} on <span className="uppercase font-bold">{bet.choice}</span> at {bet.time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toss;
