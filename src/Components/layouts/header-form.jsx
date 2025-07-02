/** @format */

import { NavLink } from "react-router-dom";
import { ActiveLink } from "../error/Activelink";

const HeaderForm = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <NavLink to="/home" className="text-2xl font-bold text-blue-600">
            MyLogo
          </NavLink>
          <nav className="hidden md:flex space-x-6">
            <NavLink to="home" className="text-gray-700 hover:text-blue-700">
              Home
            </NavLink>
            <NavLink
              to="about"
              className="text-gray-700 hover:text-blue-700"
              style={ActiveLink}>
              About
            </NavLink>
            <NavLink
              to="movies"
              className="text-gray-700 hover:text-blue-700"
              style={ActiveLink}>
              Movies
            </NavLink>
            <NavLink
              to="contact"
              className="text-gray-700 hover:text-blue-700"
              style={ActiveLink}>
              Contact
            </NavLink>
          </nav>
          <NavLink
            to="movies"
            className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </NavLink>
          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default HeaderForm;
