import React from 'react'
import { ArrowRight, Mail } from "lucide-react";
import logo from '../assets/images/logo.png'


const Footer = () => {
  return (
    <footer className="bg-[#0c0c0f] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Logo and Newsletter */}
        <div className="md:col-span-1">
          <div className="flex items-center w-[80%] gap-2 mb-4">
            <img src={logo} alt="logo" className="w-full " />
          </div>
          <p className="text-xl font-semibold mb-4">
            The World’s Favorite <br />
            Casino Games
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Newsletter Signup</h3>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-2 pl-10 pr-10 bg-transparent border-b border-gray-500 focus:outline-none placeholder:text-gray-400"
            />
            <Mail className="absolute left-2 top-2.5 text-gray-400 w-5 h-5" />
            <ArrowRight className="absolute right-2 top-2.5 text-gray-400 cursor-pointer w-5 h-5" />
          </div>

          <div className="flex items-center mt-4 text-sm text-gray-400">
            <input
              type="checkbox"
              id="privacy"
              className="mr-2 border border-gray-400"
            />
            <label htmlFor="privacy">
              I agree to the <span className="text-white font-medium">Privacy Policy</span>.
            </label>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Socials</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Dribble</li>
            <li>Instagram</li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Casinos</li>
            <li>About Us</li>
            <li>Games</li>
            <li>Contacts</li>
          </ul>
        </div>

        {/* Say Hellos */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Say Hellos</h3>
          <p className="text-gray-400">info@email.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        <p>
          ©2024 All Rights Copyright{" "}
          <span className="text-yellow-400 font-medium">Royal Spins</span>. Design &
          Developed By{" "}
          <span className="text-yellow-500 font-semibold">UIPARADOX</span>.
        </p>
      </div>

      {/* Scroll to top icon */}
      <div className="fixed bottom-4 right-4 bg-lime-400 p-2 rounded-full cursor-pointer">
        <svg
          className="w-5 h-5 text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.894.553l5 10a1 1 0 01-1.788.894L10 5.618 5.894 14.447a1 1 0 11-1.788-.894l5-10A1 1 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer