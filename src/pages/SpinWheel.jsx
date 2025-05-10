import { Rotate3D, Triangle } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import chip1 from "../assets/images/chip1.png";
import chip2 from "../assets/images/chip2.png";
import midwheel from "../assets/images/midwheel.png";
import { AllContext } from "../context/AllContext";
import axios from "axios";
import { toast } from "react-toastify";

// import  toast  from "react-toastify";

const SpinWheel = () => {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [timer, setTimer] = useState(30);
  const [bettingClosed, setBettingClosed] = useState(false);
  const [winOrLose, setWinOrLose] = useState(null);
  const [selectedChip, setSelectedChip] = useState("");


  const { backendUrl , token  } = useContext(AllContext);

  


  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const timeLeft = 30 - (seconds % 30);
      setTimer(timeLeft);

      if (timeLeft < 15) {
        setBettingClosed(true); 
        // declareResult();
      }
      if(timeLeft === 5){
        handleSpinClick();
      }
      if(timeLeft === 28){
        setBettingClosed(false);
        setResult(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);




const segments = 50;
const anglePerSegment = 360 / segments;
const spins = 5;

const spinToTarget = (targetNumber) => {
  const wheel = wheelRef.current;
  const targetIndex = targetNumber - 1;
  const angleToTarget = targetIndex * anglePerSegment;

  const offsetBefore = 11; // optional: adjust to make it look centered
  const finalRotation = spins * 360 + (360 - angleToTarget - offsetBefore);

  console.log("🎯 Backend Target Number:", targetNumber);

  setIsSpinning(true);

  // Spin animation
  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  // After spin ends
  setTimeout(() => {
    setResult(targetNumber); // store result
    console.log(`✅ Wheel stopped at: ${targetNumber}`);

    // Reset wheel
    setTimeout(() => {
      wheel.style.transition = "transform 0.5s ease-in-out";
      wheel.style.transform = "rotate(0deg)";

      setTimeout(() => setIsSpinning(false), 1000);
    }, 1000);
  }, 4000);
};




const handleBet = async (num) => {
  if (!selectedChip) {
    alert("Please select a chip amount before placing a bet.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      backendUrl + "/api/games/spinbetplace",
      {
        amount: selectedChip,
        userChoice: num,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const resData = response.data; // extract response data

    if (resData.success === true) {
      toast.success(resData.message);
      console.log("✅ Bet placed:", resData.message);
    } else {
      toast.error(resData.message);
      console.log("❌ Failed to place bet:", resData.message);
    }
  } catch (error) {
    console.error("❌ Bet failed:", error);
    toast.error("Something went wrong while placing the bet.");
  }
};



const getWinningNumber = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/games/declarespinresult");
    console.log(response);
    if (response.data.success && response.data.result) {
      return response.data.result;
    } else {
      toast.error("Failed to get winning number");
      return null;
    }
  } catch (error) {
    console.error("❌ Failed to get winning number:", error);
    toast.error("Something went wrong while fetching result.");
    return null;
  }
};





const handleSpinClick = async () => {
  if (isSpinning) return;

  const winningNumber = await getWinningNumber();
  if (winningNumber !== null) {
    spinToTarget(winningNumber);
  }
  
};

    // Spins and lands with 37 at top
  const generateNumbers = () => {
    const rows = [[], [], [], [], []];
    for (let i = 1; i <= 50; i++) {
      rows[(i - 1) % 5].push(i);
    }
    return rows;
  };

  const chips = [10, 50, 100, 500, 1000];

  const numbers = generateNumbers();

  return (
    <div className="w-full h-[180vh] flex flex-col justify-center items-center relative gap-4">
      {/* Arrow Pointer */}
      <div className="container relative flex flex-col items-center">
        <div className="absolute top-[-5%] rotate-180 z-10 flex justify-center w-full">
          <Triangle size={30} className="text-red-600" />
        </div>

        <img src={midwheel} className="relative z-49 rounded-full" alt="" />

        <div className="wheel" ref={wheelRef}>
          {[...Array(25)].map((_, i) => (
            <span key={i} style={{ "--i": i }} className={`${(i + 1) % 2 === 0 ? "bg-gray-500" : "bg-red-600"}`} />
          ))}
          <div className="number">
            {[...Array(50)].map((_, i) => (
              <b key={i} style={{ "--i": i }} className="text-sm" >{i + 1}</b>
            ))}
          </div>
        </div>
        
      </div>

      {/* Timer */}
      <div className="text-lg font-bold mt-4">
        Time Left: {timer} seconds
      </div>

      {/* Popup */}
      {/* {result && <ResultPopup />} */}

      {/* Betting Board */}
      <div className=" w-full h-[80vh] flex flex-col md:flex-row  justify-evenly ">
        <div className="bg-gray-900 relative p-4 w-full md:w-[78%] grid gap-2" >
          { bettingClosed && (
            <div className="w-full h-full z-50 bg-[#00000094] absolute top-0 flex justify-center items-center " >
            <h1 className="text-2xl"  >Betting is Closed ....</h1>
            </div>
          )}
          <div className="grid grid-cols-[repeat(11,minmax(0,1fr))] gap-1">
            <div className="border-2 px-2 row-span-5 flex justify-center items-center text-white font-bold rounded">
              {result}
            </div>
            {numbers.flat().map((num, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex justify-center items-center text-white font-bold rounded cursor-pointer ${
                  num % 2 === 0 ? 'bg-black' : 'bg-red-600'
                }`}
                onClick={() => handleBet(num)} // replace with actual handler
              >
                {num}
              </div>
            ))}
          </div>

          <div className="flex space-x-2 w-full justify-start mt-4">
            {chips.map((chip, idx) => (
              <div key={idx} className="relative rounded-full flex justify-center items-center">
                <img
                  src={idx % 2 === 0 ? chip1 : chip2}
                  alt={`Chip ${chip}`}
                  className={`w-20 h-20 rounded-full object-contain cursor-pointer ${
                    selectedChip === chip ? 'w-25 h-25' : ''
                  }`}
                  onClick={() => setSelectedChip(chip)}
                />
                <h1
                  className="absolute text-white text-sm font-bold cursor-pointer"
                  onClick={() => setSelectedChip(chip)}
                >
                  {chip}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full md:w-[20%] " >
          <div className="w-full rounded-md overflow-hidden shadow-lg">
            <div className="bg-green-600 text-white text-center py-2 font-bold text-sm">HISTORY</div>
            <div className="bg-gray-900 text-white text-xs max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3342</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-black">6</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3341</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-black">15</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3340</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">27</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
              <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
                <span>3339</span>
                <div className="w-6 h-6 flex items-center justify-center rounded text-white text-sm font-bold bg-red-600">30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
