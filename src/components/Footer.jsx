import { Home, Gift, Activity, Wallet, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4 z-50">
      <div className="flex justify-between items-center text-xs text-gray-400">
        {/* Activity */}
        <button className="flex flex-col items-center hover:text-white transition">
          <Activity className="w-5 h-5 mb-1 text-pink-400" />
          <span>Activity</span>
        </button>

        {/* Promotion */}
        <button className="flex flex-col items-center hover:text-white transition">
          <Gift className="w-5 h-5 mb-1 text-yellow-400" />
          <span>Promos</span>
        </button>

        {/* Home (center button) */}
        <div className="relative -top-6">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-black p-4 rounded-full shadow-lg">
            <Home className="w-6 h-6" />
          </button>
        </div>

        {/* Transactions */}
        <button className="flex flex-col items-center hover:text-white transition">
          <Wallet className="w-5 h-5 mb-1 text-green-400" />
          <span>Wallet</span>
        </button>

        {/* User */}
        <button className="flex flex-col items-center hover:text-white transition">
          <User className="w-5 h-5 mb-1 text-blue-400" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
