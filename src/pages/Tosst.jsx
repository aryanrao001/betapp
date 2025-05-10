import React from 'react'

const Tosst = () => {
  return (
        <div className='h-[100vh] flex justify-center items-center ' >
            <div className='bg-gray-900 w-[80%] h-[70vh]' >
                <div className="top-bar h-[20vh] ">
                    <div className="header-container h-full "  >
                        <div className="header-content">
                            <div className="title">THE SENTIENCE PROJECT</div>
                            <div className="subtitle">RIFTERS AI - DALI (DARK ALTERNATE LIFE INITIATIVE)</div>
                        </div>
                        <div className="info ">
                            <span>$100</span>
                            <span>ExD3.421</span>
                        </div>
                        <div className="hud-line"></div>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 px-8 h-[50vh] ">
                    {/* Recent Play */}
                    <div className="col-span-1">
                    <div className="text-center text-lg border-b border-gray-700 pb-2 mb-2">
                        RECENT PLAY
                    </div>
                    <div className="space-y-2 text-sm">
                        <div>
                        <span className="text-gray-400">just now</span><br/>
                        <span className="text-white">BACONBURGER</span> rugged <span className="text-blue-400">25 $Senti</span>
                        </div>
                        <div>
                        <span className="text-gray-400">1 min ago</span><br/>
                        <span className="text-white">GUS</span> won <span className="text-green-400">25 $Senti</span>
                        </div>
                        <div>
                        <span className="text-gray-400">30 min ago</span><br/>
                        <span className="text-white">GUS</span> won <span className="text-green-400">100 $Senti</span>
                        </div>
                    </div>
                    </div>

                    {/* Center Coin Display */}
                    <div className="col-span-3 flex flex-col items-center justify-evenly">
                        <h1>Timer : </h1>
                    <div className="w-40 h-40 border-4 border-cyan-400 rounded-full flex items-center justify-center shadow-2xl">
                        <div className="text-6xl text-cyan-400">$</div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black">
                        HEAD
                        </button>
                        <button className="px-6 py-2 border-r-2 border-l-2 border-white rounded hover:bg-white hover:text-black">
                        TAIL
                        </button>
                    </div>
                    </div>

                    {/* Top Double */}
                    <div className="col-span-1">
                    <div className="text-center text-lg border-b border-gray-700 pb-2 mb-2">
                        TOP <span className="text-blue-400">DOUBLE</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div>
                        <span className="text-white">BACONBURGER</span> <span className="text-blue-400">x5</span>
                        </div>
                        <div>
                        <span className="text-white">KEVIN</span> <span className="text-blue-400">x4</span>
                        </div>
                        <div>
                        <span className="text-white">MAD-MAN</span> <span className="text-blue-400">x3</span>
                        </div>
                        <div>
                        <span className="text-white">G-MAN</span> <span className="text-blue-400">x2</span>
                        </div>
                        <div>
                        <span className="text-white">GUS</span> <span className="text-blue-400">x2</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div>
                    <div>
                        
                    </div>
                </div>



            </div>
        </div>
  )
}

export default Tosst