import React from 'react'
import { Gift, Users, Clock } from 'lucide-react'

const promotions = [
  {
    title: '💸 Welcome Bonus!',
    description: 'Get ₹500 free on your first deposit. No code needed.',
    icon: <Gift className="text-pink-400 w-6 h-6" />,
    bg: 'from-purple-600 to-pink-500',
  },
  {
    title: '👯 Refer & Earn',
    description: 'Invite your friends & earn ₹200 when they join and deposit.',
    icon: <Users className="text-green-400 w-6 h-6" />,
    bg: 'from-green-600 to-teal-500',
  },
  {
    title: '⏳ 24-Hour Hot Drop!',
    description: 'Place a bet today & stand a chance to win ₹1000 cashback.',
    icon: <Clock className="text-yellow-400 w-6 h-6" />,
    bg: 'from-yellow-600 to-orange-500',
  },
]

const Promotion = () => {
  return (
    <div className="w-full mt-20 min-h-screen bg-black text-white flex flex-col">
      {/* <Header2 /> */}

      <div className="flex flex-col items-center px-4 py-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">🔥  Just for You</h2>

        <div className="w-full max-w-md space-y-6">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${promo.bg} rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center gap-4 mb-2">
                {promo.icon}
                <h3 className="text-xl font-semibold">{promo.title}</h3>
              </div>
              <p className="text-sm text-white/90 mb-4">{promo.description}</p>
              <button className="bg-black text-white border border-white rounded-xl px-4 py-2 text-sm hover:bg-white hover:text-black transition-all">
                Claim Now
              </button>
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

export default Promotion
