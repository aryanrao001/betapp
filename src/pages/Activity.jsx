import React from 'react'
import {
  Trophy,
  XCircle,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react'

const Activity = () => {
  const activities = [
    {
      type: 'win',
      match: 'MI vs CSK',
      amount: '+₹500',
      date: 'April 12, 2025',
      icon: <Trophy className="text-green-400 w-5 h-5" />,
    },
    {
      type: 'loss',
      match: 'RCB vs KKR',
      amount: '-₹300',
      date: 'April 11, 2025',
      icon: <XCircle className="text-red-400 w-5 h-5" />,
    },
    {
      type: 'deposit',
      amount: '₹1,000',
      date: 'April 10, 2025',
      icon: <ArrowUpCircle className="text-blue-400 w-5 h-5" />,
    },
    {
      type: 'withdrawal',
      amount: '₹600',
      date: 'April 09, 2025',
      icon: <ArrowDownCircle className="text-yellow-400 w-5 h-5" />,
    },
  ]

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* <Header2 /> */}

      <div className="flex flex-col items-center mt-24 px-4 py-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Activity 📊</h2>

        <div className="w-full max-w-md space-y-4">
          {activities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#111111] border border-gray-800 rounded-2xl p-4 hover:bg-[#1a1a1a] transition-all"
            >
              <div>{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm">
                  {item.type === 'win' || item.type === 'loss'
                    ? `${item.match} - ${item.type === 'win' ? 'You Won' : 'You Lost'}`
                    : item.type === 'deposit'
                    ? 'Deposit Added'
                    : 'Withdrawal Made'}
                </p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <div
                className={`text-sm font-bold ${
                  item.amount.startsWith('+')
                    ? 'text-green-400'
                    : item.amount.startsWith('-')
                    ? 'text-red-400'
                    : 'text-blue-300'
                }`}
              >
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Activity
