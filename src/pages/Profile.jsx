import React, { useContext } from 'react'
import {
  UserCircle,
  Wallet,
  Coins,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from 'react-router-dom'
import { AllContext } from '../context/AllContext';




const Profile = () => {


    const {
    balance,
    summary,
    loadingBalance,
    loadingSummary,
    error,
    userDetails
  } = useContext(AllContext);
  
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">

        <div className="flex flex-col  items-center mt-30 px-4">
            {/* Profile Info */}
            <div className="bg-[#111111] rounded-3xl shadow-md p-6 w-full max-w-md text-center border border-gray-800">
            <UserCircle className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <h2 className="text-2xl font-semibold">
                {userDetails?.name || "N/A"}
            </h2>
            <p className="text-sm text-gray-400">
                @{userDetails?.email || "N/A"}
            </p>
            </div>

            {/* Wallet Section */}
            <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-green-400" />
                <span className="text-lg font-medium text-white">Wallet Balance</span>
                </div>
                <span className="text-xl font-bold text-green-300 flex items-center gap-1">
                <Coins className="w-5 h-5" />
                {balance}
                </span>
            </div>
            </div>

            {/* Today's Bets Section */}
            {/* <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 w-full max-w-md border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
                <History className="w-5 h-5 text-pink-400" />
                <h3 className="text-lg font-semibold text-white">Today’s Bets</h3>
            </div>

            {todaysBets.length > 0 ? (
                <ul className="space-y-4">
                {todaysBets.map((item, i) => {
                    const time = new Date(item.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    });
                    return (
                    <li
                        key={i}
                        className="flex justify-between items-center p-3 rounded-xl transition-all duration-200"
                    >
                        <div className="flex flex-col">
                        <span className="text-white font-medium">
                            {item.match || "Match"} -{" "}
                            <span className="text-sm text-gray-400">
                            {item.mode === "debit" ? "Bet Placed" : "Deposit"}
                            </span>
                        </span>
                        <span className="text-xs text-gray-500 mt-1">{time}</span>
                        </div>
                        <span
                        className={`text-md font-semibold flex items-center gap-1 ${
                            item.mode === "debit"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                        >
                        {item.mode === "debit"
                            ? `-  ${item.bet_amount}`
                            : `+${item.bet_amount}`}
                        <Coins className="w-5 h-5" />
                        </span>
                    </li>
                    );
                })}
                </ul>
            ) : (
                <p className="text-gray-400 text-sm text-center">
                No bets placed today.
                </p>
            )}
            </div> */}

            {/* Settings Section */}
            <div className="bg-[#111111] rounded-3xl shadow-md p-6 mt-4 mb-24 w-full max-w-md space-y-4 border border-gray-800">
            {/* <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
                <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-blue-400" />
                <span className="text-md font-medium text-white">Account Settings</span>
                </div>
                <span className="text-sm text-gray-500">›</span>
            </div> */}

            <div className="flex items-center justify-between cursor-pointer hover:opacity-80">
                <div 
                // onClick={handleLogout}
                 className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-md font-medium text-red-400">Logout</span>
                </div>
            </div>
            </div>
        </div>

        <div className="mt-auto">
        </div>
        </div>
  )
}

export default Profile