import React, { useState, useEffect, useRef, useContext } from "react";
import { AllContext } from "../context/AllContext";
import axios from "axios";
import { toast } from "react-toastify";
import head from "../assets/images/head.png";
import tail from "../assets/images/onerupee.png";
import { LockKeyhole } from 'lucide-react';
import { io } from "socket.io-client";



// import winimage from "../assets/images/win.png";
const Tosst= () => {
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

  const { backendUrl, token , balance , setUpdate } = useContext(AllContext);

  const [tossResults, setTossResults] = useState(null);

  const socket = io(backendUrl); // ensure this is outside if singleton is intended

  useEffect(() => {
    const handleTimer = (newTime) => {
      setTimer(newTime);
    };

    const handleTossResult = (data) => {
      console.log(data.result);
      setResult(data.result);
      setMessage(`Toss Result: ${data.result}`);
    };

    const handleRoundStart = () => {
      setIsBetAllowed(true);
      setUserChoice(null);
      setResult(null);
    };

    socket.on('timer', handleTimer);
    socket.on('tossResult', handleTossResult);
    socket.on('round-start', handleRoundStart);

    return () => {
      socket.off('timer', handleTimer);
      socket.off('tossResult', handleTossResult);
      socket.off('round-start', handleRoundStart);
    };
  }, []);
  










  

  // useEffect(() => {
  //   const initializeGame = async () => {
  //     try {
  //       await axios.get(`${backendUrl}/api/games/currentround`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       // Start timer interval only after backend confirms timer start
  //       const interval = setInterval(() => {
  //         const timeLeft = 30 - (new Date().getSeconds() % 30);
  //         setTimer(timeLeft);
  //         if (timeLeft <= 15) setIsBetAllowed(false);
  //         if (timeLeft === 5) {
  //           declareResult().then(() => tossResult());
  //           setUpdate(0);
  //         }
  //       }, 1000);

  //       return () => clearInterval(interval);
  //     } catch (error) {
  //       toast.error("Failed to start timer from backend");
  //     }
  //   };

  //   initializeGame();
  // }, []);

  const tossResult = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/games/tossresult`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const outcome = response.data.bets; // Should be an array
      setBets(outcome); // ✅ Correct state setter
    } catch (error) {
      console.error("Error fetching toss result:", error);
      toast.error("Failed to fetch toss result!");
    }
  };

  useEffect(() => {
    tossResult();
  }, []);

  // Log `bets` only after it updates
  useEffect(() => {
    console.log("Updated bets:", bets);
  }, [bets]);

  // const declareResult = async () => {
  //   try {
  //     const response = await axios.post(`${backendUrl}/api/games/declare`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
      

  //     const outcome = response.data.result;
  //     setResult(outcome);
  //     setFlipClass(outcome === "heads" ? "flip-head" : "flip-tail");

  //     if (userChoice && betAmount > 0) {
  //       if (userChoice === outcome) {
  //         const win = betAmount * 2;
  //         setWinAmount((prev) => prev + win);
  //         setMessage(`🎉 You WON ₹${win}! It's ${outcome.toUpperCase()}`);
  //         toast.success(`🎉 You WON ₹${win}! It's ${outcome.toUpperCase()}`);
  //         setPopupImage("/path/to/win-image.jpg");
  //       } else {
  //         setMessage(`😢 You LOST ₹${betAmount}. It's ${outcome.toUpperCase()}`);
  //         toast.error(`😢 You LOST ₹${betAmount}. It's ${outcome.toUpperCase()}`);
  //         setPopupImage("/path/to/lose-image.jpg");
  //       }
  //       setShowPopup(true);
  //     } else {
  //       setMessage(`🪙 Result: ${outcome.toUpperCase()} (No bet placed)`);
  //     }

  //     setTimeout(() => {
  //       resetGameState();
  //     }, 5000);
  //   } catch (error) {
  //     console.error("Error declaring result:", error);
  //     toast.error("Failed to declare toss result!");
  //   }
  // };

  // const resetGameState = () => {
  //   setUserChoice(null);
  //   setBetAmount(0);
  //   setIsBetAllowed(true);
  //   setResult(null);
  //   setMessage("");
  //   setFlipClass("");
  // };

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
      console.error("Error placing bet:", error);
      toast.error("Failed to place bet!");
    }
  };

  const handleUserBet = (choice) => {
    placeBet(choice);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupImage("");
  };

  const chips = [10, 50, 100, 500, 1000];
  return (
    <>
      
      <div className='h-auto md:h-[100vh] flex justify-center items-center my-19'>
        <div className='bg-gray-900 w-[80%] h-[200vh] md:h-[90vh]'>
          <div className="top-bar h-[20vh]">
            <div className="header-container">
              <div className="header-content text-left md:text-center ">
                <div className="title">TOSS COIN</div>
                <h4 className="text-sm py-2">TOSS THE COIN AND TRY LUCK</h4>
              </div>
              <div className="info">
                <span>Rs.{balance}</span>
                {/* <span>ExD3.421</span> */}
              </div>
              <div className="hud-line"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-8 h-[120vh] md:h-[40vh]">
            {/* Recent Play */}
            <div className="col-span-1">
              <div className="text-center text-lg border-b border-gray-700 pb-2 mb-2">
                RECENT PLAY
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">just now</span><br />
                  <span className="text-white">BACONBURGER</span> rugged <span className="text-blue-400">25 $Senti</span>
                </div>
                <div>
                  <span className="text-gray-400">1 min ago</span><br />
                  <span className="text-white">GUS</span> won <span className="text-green-400">25 $Senti</span>
                </div>
                <div>
                  <span className="text-gray-400">30 min ago</span><br />
                  <span className="text-white">GUS</span> won <span className="text-green-400">100 $Senti</span>
                </div>
              </div>
            </div>

            {/* Center Coin Display */}
            <div className="col-span-3 flex flex-col items-center h-[70vh] justify-evenly">
              <h1 className="  text-xl">{timer}s </h1>

              {/* Coin Display - Mobile Top */}
              <div
                className={`w-full h-60 md:h-40 flex items-center justify-center rounded-full transition-transform duration-700 ease-in-out transform order-first md:order-none`}
              >
                <div className={`w-40 h-40 rounded-full transition-transform duration-700 ease-in-out transform ${flipClass}`}>
                  <img className="w-full h-full object-contain" src={flipClass === "flip-head" ? head : tail} alt="Coin" />
                </div>
              </div>

              {/* Heads / Tails Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black disabled:opacity-40"
                  disabled={!isBetAllowed || betAmount <= 0 || userChoice}
                  onClick={() => handleUserBet("heads")}
                >
                  {userChoice === "heads" ? <LockKeyhole /> : <span>HEADS</span>}
                </button>
                <button
                  className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black disabled:opacity-40"
                  disabled={!isBetAllowed || betAmount <= 0 || userChoice}
                  onClick={() => handleUserBet("tails")}
                >
                  {userChoice === "tails" ? <LockKeyhole /> : <span>TAILS</span>}
                </button>
              </div>
              {!isBetAllowed && (
                <p className="text-red-400 font-semibold text-sm mt-4 animate-pulse">
                  ⏳ Betting closed! Wait for next round...
                </p>
              )}

              {/* Bet Chips & Input */}
              <div className="h-[20vh] md:h-[5vh] pt-4 grid grid-cols-5 md:flex md:justify-center md:gap-8 items-center">
                {chips.map((chip, idx) => (
                  <div key={idx} className="relative md:w-30  rounded-full flex md:justify-center gap-10 items-center">
                    <button
                      onClick={() => setBetAmount(Number(chip))}
                      className={`md:px-6 px-2 py-2 md:py-2 border-t-2 border-b-2 border-white rounded hover:border-r-2 hover:border-l-2 hover:border-t-0 hover:border-b-0 hover:text-xl transition-all ${betAmount === chip ? 'bg-white text-black' : ''
                        }`}
                    >
                      {chip}
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="border w-full pr-8 pl-3 rounded-sm text-sm h-[5vh] hidden md:block"
                  placeholder="Type Bet Amount"
                />
              </div>
              <input
                type="text"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="border pr-8 pl-3 rounded-sm text-sm h-[5vh] block md:hidden"
                placeholder="Type Bet Amount"
              />
              <h1 className="text-center pt-6">Your Selected Bet Amount: {betAmount}</h1><br />
            </div>

            {/* Top Double */}
            <div className="md:col-span-1 w-full ">
              <div className="text-center text-lg border-b border-gray-700 pb-2 mb-2">
                Last <span className="text-blue-400">Results</span>
              </div>
              <div className="space-y-2 text-sm">
                {
                  bets.map((item,index)=>(
                    // <div key={index} className="border-b-2 border-gray-800 flex pb-2 justify-between " ><span className="text-white">{item.result}</span> <span className="text-blue-400"> { item.result === 'heads' ? ( <img src={head} className="w-10" /> ) : ( <img src={tail} className="w-10" />  ) } </span></div>
                    <div key={index} className="border-b-2 border-gray-800 flex pb-2 justify-between " ><span className="text-white uppercase ">{item.result}</span> <span className="text-blue-400">  <img src={item.result === 'heads' ? head : tail} className="w-5" /> </span></div>
                  ))
                }
              </div>
            </div>
          </div>
          {/* Result Block */}
        </div>
      </div>
    </>
  );
};

export default Tosst ;





