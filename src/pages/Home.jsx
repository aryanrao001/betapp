import React from 'react'
import Header from '../components/Header'
import bg from '../assets/images/hero-bg.jpg'
import hero from '../assets/images/hero-img.png'
import cimg1 from '../assets/images/img-1.jpg'
import cimg2 from '../assets/images/img-2.jpg'
import Image from '../components/Image'
import gameimg1 from '../assets/images/toss3bg.png'
import gameimg2 from '../assets/images/aviatorbg.png'
import gameimg3 from '../assets/images/game-img-3.png'
import gameimg4 from '../assets/images/mang3bgt.png'
import betimg1 from '../assets/images/betitng-img-1.png'
import betimg2 from '../assets/images/betitng-img-2.png'
import betimg3 from '../assets/images/betitng-img-3.png'
import content5 from '../assets/images/last-chance-bg.jpg'
import midwheel from "../assets/images/midwheel.png";
import head from "../assets/images/head.webp";
import tail from "../assets/images/tail.webp";
import cricketslot from "../assets/images/cricketslot.png"
import mi from "../assets/images/mi-logo.avif"
import rcb from "../assets/images/rcb-logo.avif"

import { User,NotebookText , Gamepad2 , ArrowUpRight,   } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AllContext } from '../context/AllContext'


const Home = () => {

  const { token,  update , setUpdate } = useContext(AllContext);

  useEffect(() => {
    setUpdate(!update);
  }, [token])
  


  return (
    <div>

      <div className='relative -z-10 flex justify-center h-[70vh] sm:h-[100vh]  ' >
        <img src={bg}  alt="" className="absolute inset-0 w-full h-full object-cover z-[-1] brightness-75"  />
        <div className='absolute w-[100%] sm:w-[100%] bottom-10 sm:bottom-20 left-5 z-50 sm:left-20' >
          <h1 className='text-3xl sm:text-6xl poppins-bold ' >
            <span className='text-[#ACFC00]' >- </span> BET ON FUN , WIN <br /> ON FORTUNE - ENTER <br /> <span className='text-[#ACFC00]' >CASINO REALM.</span>
          </h1>
        </div>
        <div className=' absolute bottom-0 flex justify-center ' >
          <img className='w-[70%] sm:w-[55%]' src={hero} alt="" />
        </div>
      </div>

      {/* ===== Content 1 =====  */}


      <div className='flex p-2 justify-center h-[160vh] sm:h-[130vh]  items-center relative ' >
        <Image/>
        <div className=' flex-col sm:flex-row flex w-[100%] sm:w-[70%] gap-4 ' >
          <div className='sm:w-[50%] w-[99%]' >
            <img className='w-full border-amber-600 border ' src={cimg1} alt="" />
          </div>
          <div className='sm:w-[50%] w-[99%]' >
            <h1 className='text-6xl poppins-bold ' >About The <span className='text-[#ACFC00] ' >Casino </span> </h1>
            <p className='py-5' >Lorem ipsum dolor sit amet consectetur. A arcu mi non euismod sodales purus. Nibh id dolor odio eget in. Cursus tempor quisque diam interdum venenatis praesent quisque leo. Sit turpis arcu mauris at pharetra. Condimentum porttitor nec vitae nunc gravida nunc consectetur eu nisl. Nibh pharetra diam venenatis netus tortor turpis in turpis feugiat.</p>
            <button className=' bg-[#ACFC00]/60  rounded-[10px] p-2' >Find Out More</button>
            <img className='w-full border-[#ACFC00]-600 border mt-4' src={cimg2} alt="" />
          </div>
        </div>
      </div>

      {/* ==== content 2 ===== */}

      <div className='flex sm:flex-row flex-col justify-center h-[80vh] sm:h-[40vh] items-center gap-4 ' >
        <div className='flex items-center  px-4 py-7 gap-3 rounded-xl ' style={{ border: '3px solid #ACFC00 ' }}   >
          <h1 className='text-[#ACFC00] poppins-bold ' ><User className='text-4xl' /></h1>
          <div>
            <h1 className='text-[#ACFC00] poppins-extrabold text-3xl ' >78 091 </h1>
            <h6 className='text-[15px] poppins-bold' >Registered User </h6>
          </div>
        </div>

        <div className='flex items-center  px-4 py-7 gap-3 rounded-xl ' style={{ border: '3px solid #8D00F9 ' }}   >
          <h1 className='text-[#8D00F9] poppins-bold ' ><NotebookText /></h1>
          <div>
            <h1 className='text-[#8D00F9] poppins-extrabold text-3xl ' > 435 561 </h1>
            <h6 className='text-[15px] poppins-bold' >Task Completed </h6>
          </div>
        </div>

        <div className='flex items-center  px-4 py-7 gap-3 rounded-xl ' style={{ border: '3px solid #009CFF ' }}   >
          <h1 className='text-[#009CFF] poppins-bold ' ><Gamepad2 /></h1>
          <div>
            <h1 className='text-[#009CFF] poppins-extrabold text-3xl ' > 5,500.725   </h1>
            <h6 className='text-[15px] poppins-bold' >Total Games Earned  </h6>
          </div>
        </div>
        
        <div className='flex items-center  px-4 py-7 gap-3 rounded-xl ' style={{ border: '3px solid #FFD600 ' }}   >
          <h1 className='text-[#FFD600] poppins-bold ' ><NotebookText /></h1>
          <div>
            <h1 className='text-[#FFD600] poppins-extrabold text-3xl ' > 2,150.281 </h1>
            <h6 className='text-[15px] poppins-bold' >Players Mode  </h6>
          </div>
        </div>
      </div>

      {/* ==== Content 4 ====  */}

      <div className='flex justify-center items-center bg-black text-white px-6 py-10 min-h-screen'>
        <div className="w-full sm:w-[90%]">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            🎲 <span>Live</span> <span className="text-lime-400">Games</span>
          </h2>

          {/* <div className="sm:border sm:border-blue-600 rounded-xl sm:py-12 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <Link to='/toss' className="w-full">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border-4 border-[#009CFF] flex flex-col items-center transition-transform hover:scale-105">
                  <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                    <img src={gameimg1} className="object-contain h-full w-full" alt="Toss" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-center">Toss</h3>
                </div>
              </Link>

              <div className="w-full">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border-4 border-[#ACFC00] flex flex-col items-center transition-transform hover:scale-105">
                  <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                    <img src={gameimg2} className="object-contain h-full w-full" alt="Aviator" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-center">Aviator</h3>
                </div>
              </div>

              <Link to='/spin' className="w-full">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border-4 border-[#8D00F9] flex flex-col items-center transition-transform hover:scale-105">
                  <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                    <img src={gameimg3} className="object-contain h-full w-full" alt="Spin" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-center">Casino </h3>
                </div>
              </Link>

              <div className="w-full">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border-4 border-[#FFD600] flex flex-col items-center transition-transform hover:scale-105">
                  <div className="w-full aspect-[4/3] flex justify-center items-center overflow-hidden">
                    <img src={gameimg4} className="object-contain h-full w-full" alt="Mang Pati" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-center">Spin</h3>
                </div>
              </div>

            </div>
          </div> */}

          <div className=" rounded-xl sm:py-12 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <Link to='/toss' className="w-full">
                <div className=" h-80 p-4 rounded-xl flex flex-col items-center transition-transform hover:scale-105">
                  <div className="relative w-full h-[80%] p-2 spin-coin">
                    {/* Front Side (Head) */}
                    <div className="absolute w-full h-full backface-hidden">
                      <img src={head} alt="Head" className="w-full h-full object-contain rounded-full" />
                    </div>

                    {/* Back Side (Tail) */}
                    <div className="absolute w-full h-full rotate-y-180 backface-hidden">
                      <img src={tail} alt="Tail" className="w-full h-full object-contain rounded-full" />
                    </div>
                  </div>
                  <h1 className='py-4 text-xl font-semibold' >Toss</h1>
                </div>
              </Link>

              <Link to='/slott' >
              <div className="h-80 p-4 rounded-xl flex flex-col items-center transition-transform hover:scale-105 shake-up-down">
                <div className="relative w-full h-[80%] p-2">
                  {/* Front Side (Head) */}
                  <div className="absolute w-full h-full">
                    <img src={cricketslot} alt="Head" className="w-full h-full object-contain rounded-full" />
                  </div>
                </div>
                <h1 className='py-4 text-xl font-semibold'>Cricket Slot</h1>
              </div>
              </Link>

              <Link to='/newslot' className="w-full">
              <div className="h-80 p-4 rounded-xl flex flex-col items-center transition-transform hover:scale-105 shake-left-right">
                <div className="relative w-full h-[80%] p-2">
                  <div className="absolute w-full h-full">
                    <img src={mi} alt="Head" className="w-full h-full object-contain rounded-full" />
                  </div>
                </div>
                <h1 className='py-4 text-xl font-semibold'>Team Slot</h1>
              </div>
              </Link>

              <Link to='spinwheel' >
                <div className="w-full relative flex flex-col justify-center items-center h-80"  >
                    <div className="container2 w-full h-[80%] relative flex flex-col items-center">
                      <img src={midwheel} className="relative z-40 h-30 rounded-full" alt="" />
                      <div className="wheel2 w-20 h-20 spin-infinite " >
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
                  <h1 className='py-4 text-xl font-semibold' >Spin </h1>
                </div>
              </Link>

              
            </div>
          </div>
        </div>
      </div>

      {/* ==== Content 5 ==== */}

      <div className='h-[30vh] flex items-center  sm:h-full' >
        <img src={content5} alt="" />
      </div>

      {/* ==== Content 6 ==== */}

      <section className="bg-[#060314] py-12 px-6 sm:h-[110vh] flex flex-col justify-center text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          🎲 Online <span className="text-purple-500">Betting Platform</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Bet365 */}
          <div className="bg-[#131212] border-2 border-yellow-400 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
            <div className="bg-[#1a1a1a] p-4 w-full h-[40vh] rounded-lg mb-4">
              <img
                src={betimg1}
                alt="Bet365"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Betway Platform</h3>
            <p className="text-sm text-gray-400 mb-4">
              Lorem ipsum dolor amet consectetur. Turpis nibh nunc orci gravida eu.
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-5 py-2 rounded-full">
              READ MORE
            </button>
          </div>

          {/* Betway */}
          <div className="bg-[#131212] border-2 border-yellow-400 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
            <div className="bg-[#1a1a1a] p-4 w-full h-[40vh] rounded-lg mb-4">
              <img
                src={betimg2}
                alt="Betway"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Betway Platform</h3>
            <p className="text-sm text-gray-400 mb-4">
              Lorem ipsum dolor amet consectetur. Turpis nibh nunc orci gravida eu.
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-5 py-2 rounded-full">
              READ MORE
            </button>
          </div>

          {/* Betfair */}
          <div className="bg-[#131212] border-2 border-yellow-400 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
            <div className="bg-[#1a1a1a] p-4 w-full h-[40vh] rounded-lg mb-4">
              <img
                src={betimg3}
                alt="Betfair"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Betway Platform</h3>
            <p className="text-sm text-gray-400 mb-4">
              Lorem ipsum dolor amet consectetur. Turpis nibh nunc orci gravida eu.
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-5 py-2 rounded-full">
              READ MORE
            </button>
          </div>
        </div>
      </section>

      {/* ==== Content 7 ==== */}

      <section className="bg-[#0b0a17] text-white px-6 sm:h-[110vh] flex justify-center flex-col py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          🎲 Integrated <span className="text-lime-400">Payment Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Bank Card */}
          <div className="border-2 border-purple-600 rounded-2xl p-6  bg-[#150e2c] flex flex-col justify-between text-left relative">
            <div className="text-purple-500 mb-4 text-4xl">
              💳
            </div>
            <h3 className="font-bold text-lg mb-2">Bank Card</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur. Eget proin sed convallis sed magna aliquam sed laoreet.
            </p>
            <ArrowUpRight className="text-purple-400 absolute top-4 right-4" />
          </div>

          {/* Bank Transfers */}
          <div className="border-2 border-yellow-400 rounded-2xl p-6 bg-[#1d1b1a] flex flex-col justify-between text-left relative">
            <div className="text-yellow-400 mb-4 text-4xl">
              🔁
            </div>
            <h3 className="font-bold text-lg mb-2">Bank Transfers</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur. Eget proin sed convallis sed magna aliquam sed laoreet.
            </p>
            <ArrowUpRight className="text-yellow-300 absolute top-4 right-4" />
          </div>

          {/* E-Wallets */}
          <div className="border-2 border-lime-400 rounded-2xl p-6 bg-[#111d11] flex flex-col justify-between text-left relative">
            <div className="text-lime-400 mb-4 text-4xl">
              🪙
            </div>
            <h3 className="font-bold text-lg mb-2">E-Wallets</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur. Eget proin sed convallis sed magna aliquam sed laoreet.
            </p>
            <ArrowUpRight className="text-lime-300 absolute top-4 right-4" />
          </div>

          {/* Vouchers */}
          
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 max-w-6xl mx-auto' >
          <div className="border-2 border-cyan-400 rounded-2xl p-6 bg-[#071f2c] flex flex-col justify-between text-left relative md:col-span-1">
            <div className="text-cyan-400 mb-4 text-4xl">
              🎟️
            </div>
            <h3 className="font-bold text-lg mb-2">Vouchers</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur. Tempor lorem dignissim ornare neque tempor nibh luctus.
            </p>
            <ArrowUpRight className="text-cyan-300 absolute top-4 right-4" />
          </div>

          {/* Cryptocurrency */}
          <div className="border-2 border-fuchsia-500 rounded-2xl p-6 bg-[#150d2a] flex flex-col justify-between text-left relative md:col-span-1">
            <div className="text-fuchsia-500 mb-4 text-4xl">
              ₿
            </div>
            <h3 className="font-bold text-lg mb-2">Cryptocurrency</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur. Tempor lorem dignissim ornare neque tempor nibh luctus.
            </p>
            <ArrowUpRight className="text-fuchsia-300 absolute top-4 right-4" />
          </div>
        </div>
      </section>

      {/* ==== content 8 ===== */}

      <section className="bg-[#060617] py-12 px-6 sm:h-[70vh]  text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          🎲 <span className="text-white">Managed</span>{" "}
          <span className="text-yellow-400">Features</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Holistic Player Support */}
          <div className="rounded-2xl border-2 border-lime-400 p-6 bg-[#101615]">
            <div className="text-lime-400 text-4xl mb-4">🎧</div>
            <h3 className="text-lg font-bold mb-2">Holistic Player Support</h3>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur. Turpis nibh nunc sit.
            </p>
          </div>

          {/* Fraud Protection */}
          <div className="rounded-2xl border-2 border-purple-500 p-6 bg-[#180f22]">
            <div className="text-purple-500 text-4xl mb-4">💵</div>
            <h3 className="text-lg font-bold mb-2">Fraud Protection</h3>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur. Turpis nibh nunc sit.
            </p>
          </div>

          {/* Expertise and Flexibility */}
          <div className="rounded-2xl border-2 border-sky-400 p-6 bg-[#0b1524]">
            <div className="text-sky-400 text-4xl mb-4">🧭</div>
            <h3 className="text-lg font-bold mb-2">Expertise and Flexibility</h3>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur. Turpis nibh nunc sit.
            </p>
          </div>

          {/* Fast and Secure Payments */}
          <div className="rounded-2xl border-2 border-yellow-400 p-6 bg-[#181512]">
            <div className="text-yellow-400 text-4xl mb-4">💰</div>
            <h3 className="text-lg font-bold mb-2">Fast and Secure Payments</h3>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet consectetur. Turpis nibh nunc sit.
            </p>
          </div>
        </div>
      </section>

      



    </div>
  )
}

export default Home