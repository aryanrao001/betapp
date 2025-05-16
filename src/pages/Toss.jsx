import React, { useState, useEffect, useContext } from "react";
import { AllContext } from "../context/AllContext";
import axios from "axios";
import { toast } from "react-toastify";
import head from "../assets/images/head.png";
import tail from "../assets/images/onerupee.png";

const Toss = () => {
  const [timer, setTimer] = useState(30);
  const [userChoice, setUserChoice] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [flipClass, setFlipClass] = useState("");
  const [isBetAllowed, setIsBetAllowed] = useState(true);
  const [result, setResult] = useState(null);
  const [winAmount, setWinAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [bets, setBets] = useState([]);

  const { backendUrl, token, balance, setUpdate } = useContext(AllContext);

  useEffect(() => {
    const updateTimer = () => {
      const timeLeft = 30 - (new Date().getSeconds() % 30);
      setTimer(timeLeft);
      if (timeLeft <= 15) setIsBetAllowed(false);
      if (timeLeft === 5) {
        declareResult().then(() => tossResult());
        setUpdate(0);
      }
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const tossResult = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/games/tossresult`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBets(response.data.bets);
    } catch (error) {
      toast.error("Failed to fetch toss result!");
    }
  };

  useEffect(() => {
    tossResult();
  }, []);

  useEffect(() => {
    console.log("Updated bets:", bets);
  }, [bets]);

  const declareResult = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/games/declare`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const outcome = response.data.result;
      setResult(outcome);
      setFlipClass(outcome === "heads" ? "flip-head" : "flip-tail");

      if (userChoice && betAmount > 0) {
        if (userChoice === outcome) {
          const win = betAmount * 2;
          setWinAmount((prev) => prev + win);
          setMessage(`🎉 You WON ₹${win}! It's ${outcome.toUpperCase()}`);
          toast.success(`🎉 You WON ₹${win}! It's ${outcome.toUpperCase()}`);
          setPopupImage("/path/to/win-image.jpg");
        } else {
          setMessage(`😢 You LOST ₹${betAmount}. It's ${outcome.toUpperCase()}`);
          toast.error(`😢 You LOST ₹${betAmount}. It's ${outcome.toUpperCase()}`);
          setPopupImage("/path/to/lose-image.jpg");
        }
        setShowPopup(true);
      } else {
        setMessage(`�ꪙ Result: ${outcome.toUpperCase()} (No bet placed)`);
      }

      setTimeout(() => resetGameState(), 5000);
    } catch (error) {
      toast.error("Failed to declare toss result!");
    }
  };

  const resetGameState = () => {
    setUserChoice(null);
    setBetAmount(0);
    setIsBetAllowed(true);
    setResult(null);
    setMessage("");
    setFlipClass("");
  };

  const placeBet = async (choice) => {
    if (!isBetAllowed || betAmount <= 0 || userChoice) return;

    try {
      const payload = {
        token,
        amount: betAmount,
        userChoice: choice,
      };

      const response = await axios.post(`${backendUrl}/api/games/toss`, payload);
      if (response.data.success) {
        toast.success(response.data.message);
        setUserChoice(choice);
        setMessage(`🎯 You chose ${choice.toUpperCase()}! Waiting for result...`);
        setUpdate(1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to place bet!");
    }
  };

  const handleUserBet = (choice) => placeBet(choice);
  const closePopup = () => {
    setShowPopup(false);
    setPopupImage("");
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-500">TOSS COIN</h1>
        <p className="text-sm text-gray-400">Try your luck!</p>
        <p className="text-lg mt-2 text-amber-400">Next Flip In: {timer}s</p>
        <div className="mt-2 text-green-400 font-semibold">Balance: ₹{balance}</div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-32 h-32 mb-4 transform transition-transform duration-700 ${flipClass}`}>
          <img src={flipClass === "flip-head" ? head : tail} alt="coin" className="w-full h-full rounded-full" />
        </div>

        {message && <p className="mb-4 text-lg font-semibold animate-pulse">{message}</p>}

        <input
          type="number"
          placeholder="Enter Bet Amount"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={!isBetAllowed}
          className="mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 w-60 text-center"
        />

        <div className="flex gap-4 mb-4">
          <button
            disabled={!isBetAllowed || betAmount <= 0 || userChoice}
            onClick={() => handleUserBet("heads")}
            className="bg-yellow-600 px-6 py-2 rounded-full font-bold disabled:opacity-40"
          >
            Call Heads
          </button>
          <button
            disabled={!isBetAllowed || betAmount <= 0 || userChoice}
            onClick={() => handleUserBet("tails")}
            className="bg-amber-700 px-6 py-2 rounded-full font-bold disabled:opacity-40"
          >
            Call Tails
          </button>
        </div>

        {!isBetAllowed && <p className="text-red-400 font-semibold">⏳ Betting closed! Wait for next round...</p>}
      </div>

      {result && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-bold text-amber-400">Result: {result.toUpperCase()}</h2>
          {userChoice && <p>Your Choice: <span className="font-bold">{userChoice.toUpperCase()}</span></p>}
          <p>
            {userChoice
              ? userChoice === result
                ? "✅ Congratulations, You Won!"
                : "❌ Sorry, You Lost."
              : "❓ You didn't place a bet this round."}
          </p>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-black flex flex-col items-center">
            <img src={popupImage} alt="Result" className="w-40 h-40 mb-4" />
            <button onClick={closePopup} className="bg-red-600 text-white px-4 py-2 rounded-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toss;