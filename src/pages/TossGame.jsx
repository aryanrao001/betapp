// TossGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useContext } from 'react';
import { AllContext } from '../context/AllContext';
import tail from "../assets/images/onerupee.png";
import head from "../assets/images/head.png";
import { toast } from "react-toastify";
import { CircleX, LockKeyhole } from "lucide-react";
import lose from "../assets/images/lose.png";
import win from "../assets/images/win.png";


const TossGame = () => {

  //Usestates
  const [selectedSide, setSelectedSide] = useState(null);
  const [amount, setAmount] = useState('');
  const [timer, setTimer] = useState(30);
  const [isBetPlaced, setIsBetPlaced] = useState(false);
  const [result, setResult] = useState(null);
  const [winLose, setWinLose] = useState('');
  const [bettingOpen, setBettingOpen] = useState(true);
  const [flipClass, setFlipClass] = useState("")
  const [roundMessage, setRoundMessage] = useState('🔁 Waiting for round to start...');
  const [bets, setBets] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const selectedSideRef = useRef(null);



  //Context
  const { backendUrl, token, balance, setUpdate, update } = useContext(AllContext);

  // ==== Place Bet Function ==== //
  const placeBet = async (choice) => {
    if (!choice || !amount) {
      alert('Please select side and enter amount');
      return;
    }

    try {
      const response = await axios.post(
        // {backendUrl}+'/api/bet/place-bet',
        `${backendUrl}/api/bet/place-bet `,
        { side: choice, amount: parseFloat(amount), },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message);
      }
      setIsBetPlaced(true);
    } catch (error) {
      console.error('Failed to place bet:', error);
    }
  };

  //==== Socket Use effect ====//
  useEffect(() => {
  const socket = io(backendUrl); // replace with your backend URL if deployed

    socket.on('timer', (newTime) => {
      setTimer(newTime);
    });

    socket.on('tossResult', (data) => {
      setResult(data.result);
      setRoundMessage(`🎉 Toss Result: ${data.result.toUpperCase()}`);
      console.log(selectedSideRef.current);
      console.log(data.result)
      if (selectedSideRef.current !== null) {
        setShowPopup(true);
        if (data.result === selectedSideRef.current) {
          setWinLose('WIN');
          setShowPopup(true);
          setSelectedSide('');
        } else {
          setWinLose('LOSE');
          setShowPopup(true);
          setSelectedSide('');
        }
      }
      
    });

    socket.on('round-start', () => {
      setBettingOpen(true);
      setSelectedSide(null);
      setResult(null);
      setIsBetPlaced(false);
      setUpdate(!update)
      setRoundMessage('🔁 New round started! Place your bet.');
      tossResult();
      setFlipClass('normal')
    });

    tossResult();
    


    return () => {
      socket.off('timer');
      socket.off('tossResult');
      socket.off('round-start');
    };
  }, []);
  useEffect(() => {
    selectedSideRef.current = selectedSide;
  }, [selectedSide]);

  //==== Use Effect for Timer Updation ====//
  useEffect(() => {
    if (timer <= 10) {
      setBettingOpen(false);
      setRoundMessage('❌ Betting closed. Wait for result...');
    } else if (timer === 1) {
      setRoundMessage('🎯 Result incoming...');
    }
    tossResult();
  }, [timer]);

  const handleUserBet = (choice) => {
    placeBet(choice);
  };

  useEffect(() => {
  if (result === "heads") {
    setFlipClass("flip-head");
  } else if (result === "tails") {
    setFlipClass("flip-tail");
  }
}, [result]);

  //==== All Chips ====//
  const chips = [10, 50, 100, 500, 1000];

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

  return (
    <>

      {/* ==== Popup ==== */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#000000ce] bg-opacity-50 flex justify-center items-center z-20">
          <div className="p-6 rounded-xl text-center">
            <div
              onClick={() => setShowPopup(false)}
              className="text-right flex justify-end pr-5 pb-4  " ><CircleX /> </div>
            <h2
              className={`text-2xl font-bold ${winLose === 'WIN' ? "text-green-500" : "text-red-500"}`}
            >
              <img src={winLose === 'WIN' ? win : lose} alt="" />
              {winLose === 'WIN' ? "You Win!" : "You Lose!"}
            </h2>
            {/* <p className="mt-2">{result}</p> */}
          </div>
        </div>
      )}

      <div className='h-auto md:h-[100vh] flex justify-center items-center mt-25 md:mt-20'>
        <div className='bg-gray-900 w-[80%] h-[200vh] md:h-[90vh]'>
          <div className="top-bar h-[20vh]">
            <div className="header-container ">
              <div className="header-content text-left md:text-center ">
                <div className="title">TOSS COIN</div>
                <h4 className="text-sm py-2">TOSS THE COIN AND TRY LUCK</h4>
              </div>
              <div className="info">
                <span>Rs.{balance}</span>
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
              <div>
                {result && (
                  <div className="mt-4 text-xl">
                    🏁 Final Result: <strong>{result.toUpperCase()}</strong>
                  </div>
                )}
                {selectedSide}
              </div>

              {/* Heads / Tails Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black disabled:opacity-40"
                  disabled={!bettingOpen || amount <= 0 || selectedSide}
                  onClick={() => (handleUserBet("heads"), setSelectedSide("heads"))}
                >
                  {selectedSide === "heads" ? <LockKeyhole /> : <span>HEADS</span>}
                </button>
                <button
                  className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black disabled:opacity-40"
                  disabled={!bettingOpen || amount <= 0 || selectedSide}
                  onClick={() => (handleUserBet("tails"), setSelectedSide("tails"))}
                >
                  {selectedSide === "tails" ? <LockKeyhole /> : <span>TAILS</span>}
                </button>
              </div>
              {!bettingOpen && (
                <p className="text-red-400 font-semibold text-sm mt-4 animate-pulse">
                  ⏳ Betting closed! Wait for next round...
                </p>
              )}

              {/* Bet Chips & Input */}
              <div className="h-[20vh] md:h-[5vh] pt-4 grid grid-cols-5 md:flex md:justify-center md:gap-8 items-center">
                {chips.map((chip, idx) => (
                  <div key={idx} className="relative md:w-30  rounded-full flex md:justify-center gap-10 items-center">
                    <button
                      onClick={() => setAmount(Number(chip))}
                      className={`md:px-6 px-2 py-2 md:py-2 border-t-2 border-b-2 border-white rounded hover:border-r-2 hover:border-l-2 hover:border-t-0 hover:border-b-0 hover:text-xl transition-all ${amount === chip ? 'bg-white text-black' : ''
                        }`}
                    >
                      {chip}
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border w-full pr-8 pl-3 rounded-sm text-sm h-[5vh] hidden md:block"
                  placeholder="Type Bet Amount"
                />
              </div>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border pr-8 pl-3 rounded-sm text-sm h-[5vh] block md:hidden"
                placeholder="Type Bet Amount"
              />
              <h1 className="text-center pt-6">Your Selected Bet Amount: {amount}</h1><br />
            </div>

            {/* Top Double */}
            <div className="md:col-span-1 md:w-full">
              <div className="text-center text-lg border-b border-gray-700 pb-2 mb-2">
                Last <span className="text-blue-400">Results</span>
              </div>
              <div className="space-y-2 text-sm">
                {
                  bets.map((item, index) => (
                    // <div key={index} className="border-b-2 border-gray-800 flex pb-2 justify-between " ><span className="text-white">{item.result}</span> <span className="text-blue-400"> { item.result === 'heads' ? ( <img src={head} className="w-10" /> ) : ( <img src={tail} className="w-10" />  ) } </span></div>
                    <div key={index} className="border-b-2 border-gray-800 flex pb-2 justify-between " ><span className="text-white uppercase ">{item.winningSide}</span> <span className="text-blue-400">  <img src={item.winningSide === 'heads' ? head : tail} className="w-5" /> </span></div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TossGame;
