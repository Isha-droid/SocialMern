import React, { useContext, useRef } from 'react';
import { FaCamera, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../assets/person/2.jpeg'; // Adjust the path based on your project structure
import { AuthContext } from '../../context/AuthContext';

const Share = () => {
  const { user } = useContext(AuthContext);
  const textRef = useRef(null);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.set('desc', textRef.current.value); // Set the 'desc' field
      if (fileRef.current.files.length > 0) {
        formData.set('img', fileRef.current.files[0]); // Set the 'img' field if a file is selected
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:5000/api/post', formData, config);
      console.log('Post successful:', response.data);

      // Optionally, reset form fields after successful submission
      textRef.current.value = ''; // Reset text input
      fileRef.current.value = null; // Reset file input
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            className="h-8 w-8 rounded-full object-cover"
            alt="User"
          />
          <input
            type="text"
            ref={textRef}
            placeholder={`What's on your mind, ${user?.username}?`}
            className="w-full outline-none text-gray-800 placeholder-gray-400"
          />
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
              <FaMapMarkerAlt />
              <span className="text-sm">Location</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 focus:outline-none">
              <FaSmile />
              <span className="text-sm">Feeling/Activity</span>
            </button>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none">
            Share
          </button>
        </div>
      </form>
    </div>
  );
};

export default Share;
