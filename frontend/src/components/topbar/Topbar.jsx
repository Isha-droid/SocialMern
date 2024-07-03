import React, { useContext } from 'react';
import { FaSearch, FaUser, FaBell, FaEnvelope } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/logo.jpeg';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={logo} alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition-colors duration-300">
                Home
              </a>
              <a href="/login" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition-colors duration-300">
                Shop
              </a>
              <a href="/register" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition-colors duration-300">
                Categories
              </a>
              <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-300 sm:text-sm" placeholder="Search" type="search" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-900 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
              <FaBell className="h-6 w-6" aria-hidden="true" />
            </button>
            <button className="p-1 rounded-full text-gray-900 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
              <FaEnvelope className="h-6 w-6" aria-hidden="true" />
            </button>
            <button className="p-1 rounded-full text-gray-900 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
              <FiShoppingBag className="h-6 w-6" aria-hidden="true" />
            </button>
            {user ? (
              <div className="ml-4 relative">
                <Link to={`/profile/${user.username}`} className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
                  <span className="sr-only">Open user menu</span>
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="User Profile" className="h-8 w-8 rounded-full" />
                  ) : (
                    <FaUser className="h-8 w-8 rounded-full text-gray-900" aria-hidden="true" />
                  )}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
