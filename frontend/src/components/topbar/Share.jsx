import React from 'react';
import { FaCamera, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import logo from '../../assets/person/2.jpeg'; // Adjust the path based on your project structure


const Share = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          className="h-8 w-8 rounded-full object-cover"
          alt="User"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full outline-none text-gray-800 placeholder-gray-400"
        />
      </div>
      <hr className="my-2 border-gray-300" />
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
            <FaCamera />
            <span className="text-sm">Photo</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
            <FaMapMarkerAlt />
            <span className="text-sm">Location</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
            <FaSmile />
            <span className="text-sm">Feeling/Activity</span>
          </button>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none">
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
