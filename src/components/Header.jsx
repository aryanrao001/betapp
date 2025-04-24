import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { BellDot, Search, Dot, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed z-50 w-full bg-transparent  px-4 py-2">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-[10vh] border border-white/10 rounded-xl backdrop-blur-3xl bg-white/10 px-4">
          {/* Logo */}
          <div className="w-1/2 md:w-[20%] flex items-center">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex w-2/3 justify-center">
            <ul className="flex gap-5 poppins-medium text-sm text-white items-center">
              <li className="hover:text-lime-300 cursor-pointer">Home</li>
              <li className="flex items-center gap-1 hover:text-lime-300 cursor-pointer">
                <Dot /> Games
              </li>
              <li className="flex items-center gap-1 hover:text-lime-300 cursor-pointer">
                <Dot /> Pages
              </li>
              <li className="flex items-center gap-1 hover:text-lime-300 cursor-pointer">
                <Dot /> Blog
              </li>
              <li className="flex items-center gap-1 hover:text-lime-300 cursor-pointer">
                <Dot /> Contact Us
              </li>
            </ul>
          </nav>

          {/* Right Icons and Button */}
          <div className="hidden md:flex w-[20%] justify-end gap-4 items-center">
            <div className="bg-black/10 p-2 rounded-full backdrop-blur-3xl">
              <BellDot />
            </div>
            <div className="bg-black/10 p-2 rounded-full backdrop-blur-3xl">
              <Search />
            </div>
            <button className="bg-[#ACFC00]/60 rounded-[15px] px-4 py-2 text-sm font-semibold">
              Find Out More
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/70 text-white px-6 py-4 rounded-xl mt-2 w-[90%] mx-auto">
            <ul className="flex flex-col gap-4 text-base font-medium">
              <Link to='/'  > 
                <li className="hover:text-lime-300 cursor-pointer">Home</li>
              </Link>
              <li className="hover:text-lime-300 cursor-pointer">Games</li>
              <li className="hover:text-lime-300 cursor-pointer">Pages</li>
              <li className="hover:text-lime-300 cursor-pointer">Blog</li>
              <li className="hover:text-lime-300 cursor-pointer">Contact Us</li>
              <div className="flex gap-4 mt-4">
                <div className="bg-black/10 p-2 rounded-full backdrop-blur-3xl">
                  <BellDot />
                </div>
                <div className="bg-black/10 p-2 rounded-full backdrop-blur-3xl">
                  <Search />
                </div>
              </div>
              <button className="bg-[#ACFC00]/60 rounded-[15px] px-4 py-2 mt-4 text-sm font-semibold w-full">
                Find Out More
              </button>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
