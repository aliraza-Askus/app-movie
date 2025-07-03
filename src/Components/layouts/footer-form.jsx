/** @format */

import { NavLink } from "react-router-dom";
import { ActiveLink } from "../error/Activelink";
const FooterForm = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <NavLink to="home" className="text-2xl font-bold text-blue-400">
              MyLogo
            </NavLink>
            <p className="text-gray-400 text-sm mt-1">
              © 2025 Ali Raza. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <NavLink to="home" className="text-gray-400 hover:text-blue-800">
              Home
            </NavLink>
            <NavLink
              to="about"
              className="text-gray-400 hover:text-blue-800"
              style={ActiveLink}>
              About
            </NavLink>
            <NavLink
              to="movies"
              className="text-gray-400 hover:text-blue-800"
              style={ActiveLink}>
              Movies
            </NavLink>
            <NavLink
              to="contact"
              className="text-gray-400 hover:text-blue-800"
              style={ActiveLink}>
              Contact
            </NavLink>
          </nav>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-gray-400 hover:text-blue-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 5.84 17.17 1 12 1S2 5.84 2 12.07c0 5.07 3.29 9.29 7.77 10.66V15.47H7.3v-3.4h2.47V9.84c0-2.45 1.47-3.8 3.7-3.8 1.07 0 2.2.2 2.2.2v2.42H14.7c-1.37 0-1.8.86-1.8 1.74v2.1h3.07l-.5 3.4h-2.57v7.26C18.71 21.36 22 17.14 22 12.07z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-gray-400 hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.34-1.6.56-2.46.66a4.26 4.26 0 001.88-2.36 8.36 8.36 0 01-2.64 1 4.2 4.2 0 00-7.16 3.84A12 12 0 013 4.53a4.2 4.2 0 001.3 5.6c-.64 0-1.25-.2-1.8-.5v.05a4.2 4.2 0 003.36 4.1c-.3.1-.64.15-.98.15a2.6 2.6 0 01-.8-.05 4.2 4.2 0 003.9 2.9 8.4 8.4 0 01-5.2 1.8 7.5 7.5 0 01-1-.05A12 12 0 0010.29 21c7.55 0 11.7-6.27 11.7-11.7v-.55A8.5 8.5 0 0022.46 6z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-gray-400 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.57v-5.4c0-1.3 0-2.96-1.8-2.96s-2.1 1.42-2.1 2.9v5.46H9.42V9h3.43v1.56h.05c.48-.9 1.65-1.8 3.4-1.8 3.63 0 4.3 2.4 4.3 5.5v6.2zM5.34 7.3c-1.15 0-2.1-.94-2.1-2.1s.95-2.1 2.1-2.1 2.1.95 2.1 2.1-.94 2.1-2.1 2.1zM6.85 20.45H3.78V9h3.07v11.45zM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default FooterForm;
